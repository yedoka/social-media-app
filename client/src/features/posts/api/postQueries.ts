import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postApi } from "./postApi";
import { userKeys } from "../../profile/api/userQueries";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { PostType } from "@/shared/types";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export const usePostsQuery = () => {
  return useInfiniteQuery({
    queryKey: postKeys.lists(),
    queryFn: postApi.getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      const previousPosts = queryClient.getQueryData(postKeys.lists());

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages?.[0]) return old;

        const optimisticPost: PostType = {
          _id: `temp-${Date.now()}`,
          text: newPost.text,
          image: newPost.image,
          user: {
            _id: "current-user",
            name: "You",
            avatar: "",
            email: "",
            bio: "",
            followers: [],
            following: [],
            posts: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          likes: [],
          comments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              posts: [optimisticPost, ...old.pages[0].posts],
              pagination: {
                ...old.pages[0].pagination,
                totalPosts: old.pages[0].pagination.totalPosts + 1,
              },
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousPosts };
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages?.[0]) return old;

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              posts: old.pages[0].posts.map((post: PostType) =>
                post._id.startsWith("temp-") ? newPost : post
              ),
            },
            ...old.pages.slice(1),
          ],
        };
      });

      queryClient.invalidateQueries({ queryKey: userKeys.currentProfile() });
      queryClient.invalidateQueries({ queryKey: userKeys.profiles() });

      toast.success("Post created successfully!", {
        theme: "dark",
        position: "top-center",
      });
    },
    onError: (error: AxiosError<{ message: string }>, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }

      toast.error(error.response?.data?.message || "Failed to create post", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousPosts = queryClient.getQueryData(postKeys.lists());

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter((post: PostType) => post._id !== postId),
            pagination: {
              ...page.pagination,
              totalPosts: page.pagination.totalPosts - 1,
            },
          })),
        };
      });

      return { previousPosts };
    },
    onSuccess: () => {
      // Invalidate profile queries so the deleted post is removed from profile page
      queryClient.invalidateQueries({ queryKey: userKeys.currentProfile() });
      queryClient.invalidateQueries({ queryKey: userKeys.profiles() });

      toast.success("Post deleted successfully!", {
        theme: "dark",
        position: "top-center",
      });
    },
    onError: (error: AxiosError<{ message: string }>, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }

      toast.error(error.response?.data?.message || "Failed to delete post", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useLikePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousPosts = queryClient.getQueryData(postKeys.lists());

      const currentUser = queryClient.getQueryData(["auth", "user"]) as any;
      const currentUserId = currentUser?._id;

      if (!currentUserId) return { previousPosts };

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId
                ? {
                    ...post,
                    likes: [...post.likes, { _id: currentUserId } as any],
                  }
                : post
            ),
          })),
        };
      });

      return { previousPosts };
    },
    onSuccess: (updatedPost, postId) => {
      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId ? updatedPost : post
            ),
          })),
        };
      });
    },
    onError: (error, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }
    },
  });
};

export const useUnlikePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApi.unlikePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousPosts = queryClient.getQueryData(postKeys.lists());

      const currentUser = queryClient.getQueryData(["auth", "user"]) as any;
      const currentUserId = currentUser?._id;

      if (!currentUserId) return { previousPosts };

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId
                ? {
                    ...post,
                    likes: post.likes.filter(
                      (like: any) => like._id !== currentUserId
                    ),
                  }
                : post
            ),
          })),
        };
      });

      return { previousPosts };
    },
    onSuccess: (updatedPost, postId) => {
      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId ? updatedPost : post
            ),
          })),
        };
      });
    },
    onError: (error, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }
    },
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) =>
      postApi.addComment(postId, text),
    onMutate: async ({ postId, text }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousPosts = queryClient.getQueryData(postKeys.lists());

      const currentUser = queryClient.getQueryData(["auth", "user"]) as any;

      if (!currentUser) return { previousPosts };

      const optimisticComment = {
        _id: `temp-${Date.now()}`,
        user: currentUser,
        text,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId
                ? {
                    ...post,
                    comments: [optimisticComment, ...post.comments],
                  }
                : post
            ),
          })),
        };
      });

      return { previousPosts };
    },
    onSuccess: (updatedComments, { postId }) => {
      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId
                ? { ...post, comments: updatedComments }
                : post
            ),
          })),
        };
      });
    },
    onError: (error, { postId }, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts);
      }

      toast.error("Failed to add comment", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => postApi.deleteComment(postId, commentId),
    onSuccess: (updatedComments, { postId }) => {
      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: PostType) =>
              post._id === postId
                ? { ...post, comments: updatedComments }
                : post
            ),
          })),
        };
      });
    },
    onError: () => {
      toast.error("Failed to delete comment", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};
