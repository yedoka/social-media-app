import {
  usePostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../api/postQueries";
import type { PostData } from "../api/postApi";

export const usePosts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePostsQuery();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const pagination = data?.pages[0]?.pagination ?? null;

  return {
    posts,
    pagination,
    loadMorePosts: fetchNextPage,
    hasMorePosts: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    isLoadingInitial: isLoading,
    isError,
    error,
    refreshPosts: refetch,
  };
};

export const usePostActions = () => {
  const createPostMutation = useCreatePostMutation();
  const deletePostMutation = useDeletePostMutation();
  const likePostMutation = useLikePostMutation();
  const unlikePostMutation = useUnlikePostMutation();
  const addCommentMutation = useAddCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  return {
    createPost: (data: PostData) => createPostMutation.mutate(data),
    deletePost: (postId: string) => deletePostMutation.mutate(postId),
    likePost: (postId: string) => likePostMutation.mutate(postId),
    unlikePost: (postId: string) => unlikePostMutation.mutate(postId),
    addComment: (postId: string, text: string) =>
      addCommentMutation.mutate({ postId, text }),
    deleteComment: (postId: string, commentId: string) =>
      deleteCommentMutation.mutate({ postId, commentId }),

    isCreatingPost: createPostMutation.isPending,
    isDeletingPost: deletePostMutation.isPending,
    isLikingPost: likePostMutation.isPending,
    isUnlikingPost: unlikePostMutation.isPending,
    isAddingComment: addCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,

    isPending:
      createPostMutation.isPending ||
      deletePostMutation.isPending ||
      likePostMutation.isPending ||
      unlikePostMutation.isPending ||
      addCommentMutation.isPending ||
      deleteCommentMutation.isPending,
  };
};

export const useCreatePost = () => {
  const mutation = useCreatePostMutation();
  return {
    createPost: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};

export const useDeletePost = () => {
  const mutation = useDeletePostMutation();
  return {
    deletePost: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
};

export const useLikePost = () => {
  const likeMutation = useLikePostMutation();
  const unlikeMutation = useUnlikePostMutation();

  return {
    likePost: likeMutation.mutate,
    unlikePost: unlikeMutation.mutate,
    isLiking: likeMutation.isPending,
    isUnliking: unlikeMutation.isPending,
    isToggling: likeMutation.isPending || unlikeMutation.isPending,
  };
};

export const usePostComments = () => {
  const addMutation = useAddCommentMutation();
  const deleteMutation = useDeleteCommentMutation();

  return {
    addComment: (postId: string, text: string) =>
      addMutation.mutate({ postId, text }),
    deleteComment: (postId: string, commentId: string) =>
      deleteMutation.mutate({ postId, commentId }),
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isPending: addMutation.isPending || deleteMutation.isPending,
  };
};
