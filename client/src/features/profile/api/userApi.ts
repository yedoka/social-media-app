import apiClient from "@/services/api/apiClient";
import type { UserType } from "@/shared/types";

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const userApi = {
  getCurrentUserProfile: async (): Promise<UserType> => {
    const response = await apiClient.get("/user/me");
    return response.data;
  },

  getUserProfile: async (userId: string): Promise<UserType> => {
    const response = await apiClient.get(`/user/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserType> => {
    const response = await apiClient.put("/user/profile", data);
    return response.data;
  },

  followUser: async (userId: string): Promise<void> => {
    await apiClient.put(`/user/follow/${userId}`);
  },

  unfollowUser: async (userId: string): Promise<void> => {
    await apiClient.put(`/user/unfollow/${userId}`);
  },

  searchUsers: async (query: string): Promise<UserType[]> => {
    const response = await apiClient.get("/user/search", {
      params: { q: query },
    });
    return response.data;
  },

  getSuggestedUsers: async (): Promise<UserType[]> => {
    const response = await apiClient.get("/user/suggestions");
    return response.data;
  },
};
