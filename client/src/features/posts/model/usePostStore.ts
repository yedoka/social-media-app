import apiClient from "@/services/api/apiClient";
import type { PostType } from "@/shared/types";
import { create } from "zustand";

interface PostData {
  text: string;
  image: string;
}

interface PostStore {
  posts: PostType[];
  getPosts: () => Promise<void>;
  createPost: (data: PostData) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  isPending: boolean;
  error: string | null;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  isPending: false,
  error: null,

  getPosts: async () => {
    try {
      set({ isPending: true, error: null });
      const res = await apiClient.get("/posts");
      set({ posts: res.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ posts: [], error: "Failed to fetch posts" });
    } finally {
      set({ isPending: false });
    }
  },

  createPost: async (data) => {
    try {
      set({ isPending: true, error: null });
      const res = await apiClient.post("/posts", {
        text: data.text,
        image: data.image,
      });
      set((state) => ({ posts: [res.data, ...state.posts] }));
    } catch (error) {
      console.error("Error creating post:", error);
      set({ error: "Failed to create post" });
    } finally {
      set({ isPending: false });
    }
  },

  deletePost: async (postId) => {
    try {
      set({ isPending: true, error: null });
      await apiClient.delete(`/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
      set({ error: "Failed to delete post" });
    } finally {
      set({ isPending: false });
    }
  },

  likePost: async (postId: string) => {
    const { posts } = get();
    const currentPost = posts.find((p) => p._id === postId);
    if (!currentPost) return;

    const { useAuthStore } = await import("@/features/auth/model/useAuthStore");
    const currentUserId = useAuthStore.getState().authUser?._id;
    if (!currentUserId) return;

    const alreadyLiked = currentPost.likes.some(
      (like) => like._id === currentUserId
    );
    if (alreadyLiked) return;

    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: [...post.likes, { _id: currentUserId } as any],
            }
          : post
      ),
    }));

    try {
      const res = await apiClient.put(`/posts/like/${postId}`);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? res.data : post
        ),
      }));
    } catch (error) {
      console.error("Error liking post:", error);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.filter((like) => like._id !== currentUserId),
              }
            : post
        ),
      }));
    }
  },

  unlikePost: async (postId: string) => {
    const { posts } = get();
    const currentPost = posts.find((p) => p._id === postId);
    if (!currentPost) return;

    const { useAuthStore } = await import("@/features/auth/model/useAuthStore");
    const currentUserId = useAuthStore.getState().authUser?._id;
    if (!currentUserId) return;

    const isLiked = currentPost.likes.some(
      (like) => like._id === currentUserId
    );
    if (!isLiked) return;

    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.filter((like) => like._id !== currentUserId),
            }
          : post
      ),
    }));

    try {
      const res = await apiClient.put(`/posts/unlike/${postId}`);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? res.data : post
        ),
      }));
    } catch (error) {
      console.error("Error unliking post:", error);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: [...post.likes, { _id: currentUserId } as any],
              }
            : post
        ),
      }));
    }
  },

  addComment: async (postId: string, text: string) => {
    try {
      set({ error: null });

      const { useAuthStore } = await import(
        "@/features/auth/model/useAuthStore"
      );
      const currentUser = useAuthStore.getState().authUser;

      if (!currentUser) return;

      const optimisticComment = {
        _id: `temp-${Date.now()}`,
        user: currentUser,
        text,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [optimisticComment, ...post.comments],
              }
            : post
        ),
      }));

      const res = await apiClient.post(`/posts/comment/${postId}`, {
        text: text,
      });

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, comments: res.data } : post
        ),
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
      set({ error: "Failed to add comment" });

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (c) => !c._id.startsWith("temp-")
                ),
              }
            : post
        ),
      }));
    }
  },

  deleteComment: async (postId: string, commentId: string) => {
    try {
      set({ error: null });
      const res = await apiClient.delete(
        `/posts/comment/${postId}/${commentId}`
      );
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, comments: res.data } : post
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  },
}));
