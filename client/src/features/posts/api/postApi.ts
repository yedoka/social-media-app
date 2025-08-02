import apiClient from "@/services/api/apiClient";
import type { PostType } from "@/shared/types";

export interface PostData {
  text: string;
  image: string;
}

export interface PostsResponse {
  posts: PostType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasMore: boolean;
    limit: number;
  };
}

export const postApi = {
  getPosts: async ({ pageParam = 1 }): Promise<PostsResponse> => {
    const response = await apiClient.get(`/posts?page=${pageParam}&limit=2`);
    return response.data;
  },

  createPost: async (data: PostData): Promise<PostType> => {
    const response = await apiClient.post("/posts", data);
    return response.data;
  },

  deletePost: async (postId: string): Promise<void> => {
    await apiClient.delete(`/posts/${postId}`);
  },

  likePost: async (postId: string): Promise<PostType> => {
    const response = await apiClient.put(`/posts/like/${postId}`);
    return response.data;
  },

  unlikePost: async (postId: string): Promise<PostType> => {
    const response = await apiClient.put(`/posts/unlike/${postId}`);
    return response.data;
  },

  addComment: async (postId: string, text: string): Promise<any[]> => {
    const response = await apiClient.post(`/posts/comment/${postId}`, { text });
    return response.data;
  },

  deleteComment: async (postId: string, commentId: string): Promise<any[]> => {
    const response = await apiClient.delete(
      `/posts/comment/${postId}/${commentId}`
    );
    return response.data;
  },
};
