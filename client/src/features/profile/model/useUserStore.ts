import apiClient from "@/services/api/apiClient";
import type { UserType, PostType } from "@/shared/types";
import { create } from "zustand";

interface UserProfile {
  user: UserType;
  posts: PostType[];
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
  };
}

interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatar?: string;
}

interface UserStore {
  currentUserProfile: UserProfile | null;
  visitedUserProfile: UserProfile | null;
  suggestedUsers: UserType[];
  searchResults: UserType[];

  isLoadingProfile: boolean;
  isLoadingSearch: boolean;
  isUpdatingProfile: boolean;
  isFollowingUser: boolean;

  error: string | null;

  getCurrentUserProfile: () => Promise<void>;
  getUserProfile: (userId: string) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  getSuggestedUsers: () => Promise<void>;
  clearSearchResults: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUserProfile: null,
  visitedUserProfile: null,
  suggestedUsers: [],
  searchResults: [],
  isLoadingProfile: false,
  isLoadingSearch: false,
  isUpdatingProfile: false,
  isFollowingUser: false,
  error: null,

  getCurrentUserProfile: async () => {
    try {
      set({ isLoadingProfile: true, error: null });
      const res = await apiClient.get("/users/me");
      set({ currentUserProfile: res.data });
    } catch (error) {
      console.error("Error fetching current user profile:", error);
      set({ error: "Failed to fetch profile" });
    } finally {
      set({ isLoadingProfile: false });
    }
  },

  getUserProfile: async (userId: string) => {
    try {
      set({ isLoadingProfile: true, error: null });
      const res = await apiClient.get(`/users/profile/${userId}`);
      set({ visitedUserProfile: res.data });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ error: "Failed to fetch user profile" });
    } finally {
      set({ isLoadingProfile: false });
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    try {
      set({ isUpdatingProfile: true, error: null });
      const res = await apiClient.put("/users/profile", data);

      set((state) => ({
        currentUserProfile: state.currentUserProfile
          ? { ...state.currentUserProfile, user: res.data }
          : null,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      set({ error: "Failed to update profile" });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  followUser: async (userId: string) => {
    try {
      set({ isFollowingUser: true, error: null });
      await apiClient.put(`/users/follow/${userId}`);

      set((state) => {
        if (state.visitedUserProfile) {
          return {
            visitedUserProfile: {
              ...state.visitedUserProfile,
              stats: {
                ...state.visitedUserProfile.stats,
                followersCount:
                  state.visitedUserProfile.stats.followersCount + 1,
              },
            },
          };
        }
        return state;
      });

      set((state) => {
        if (state.currentUserProfile) {
          return {
            currentUserProfile: {
              ...state.currentUserProfile,
              stats: {
                ...state.currentUserProfile.stats,
                followingCount:
                  state.currentUserProfile.stats.followingCount + 1,
              },
            },
          };
        }
        return state;
      });
    } catch (error) {
      console.error("Error following user:", error);
      set({ error: "Failed to follow user" });
    } finally {
      set({ isFollowingUser: false });
    }
  },

  unfollowUser: async (userId: string) => {
    try {
      set({ isFollowingUser: true, error: null });
      await apiClient.put(`/users/unfollow/${userId}`);

      set((state) => {
        if (state.visitedUserProfile) {
          return {
            visitedUserProfile: {
              ...state.visitedUserProfile,
              stats: {
                ...state.visitedUserProfile.stats,
                followersCount:
                  state.visitedUserProfile.stats.followersCount - 1,
              },
            },
          };
        }
        return state;
      });

      set((state) => {
        if (state.currentUserProfile) {
          return {
            currentUserProfile: {
              ...state.currentUserProfile,
              stats: {
                ...state.currentUserProfile.stats,
                followingCount:
                  state.currentUserProfile.stats.followingCount - 1,
              },
            },
          };
        }
        return state;
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      set({ error: "Failed to unfollow user" });
    } finally {
      set({ isFollowingUser: false });
    }
  },

  searchUsers: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      set({ isLoadingSearch: true, error: null });
      const res = await apiClient.get("/users/search", { params: { query } });
      set({ searchResults: res.data });
    } catch (error) {
      console.error("Error searching users:", error);
      set({ error: "Failed to search users" });
    } finally {
      set({ isLoadingSearch: false });
    }
  },

  getSuggestedUsers: async () => {
    try {
      set({ error: null });
      const res = await apiClient.get("/users/suggestions");
      set({ suggestedUsers: res.data });
    } catch (error) {
      console.error("Error fetching suggested users:", error);
      set({ error: "Failed to fetch suggested users" });
    }
  },

  clearSearchResults: () => {
    set({ searchResults: [] });
  },

  clearError: () => {
    set({ error: null });
  },
}));
