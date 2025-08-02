import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "./userApi";
import { postKeys } from "../../posts/api/postQueries";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { UserType } from "@/shared/types";

export const userKeys = {
  all: ["users"] as const,
  profiles: () => [...userKeys.all, "profile"] as const,
  profile: (id: string) => [...userKeys.profiles(), id] as const,
  currentProfile: () => [...userKeys.profiles(), "current"] as const,
  search: () => [...userKeys.all, "search"] as const,
  searchQuery: (query: string) => [...userKeys.search(), query] as const,
  suggestions: () => [...userKeys.all, "suggestions"] as const,
};

export const useCurrentUserProfileQuery = () => {
  return useQuery({
    queryKey: userKeys.currentProfile(),
    queryFn: userApi.getCurrentUserProfile,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => userApi.getUserProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useSearchUsersQuery = (query: string) => {
  return useQuery({
    queryKey: userKeys.searchQuery(query),
    queryFn: () => userApi.searchUsers(query),
    enabled: !!query.trim(),
    staleTime: 1000 * 30,
  });
};

export const useSuggestedUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.suggestions(),
    queryFn: userApi.getSuggestedUsers,
    staleTime: 1000 * 60 * 10,
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: userKeys.currentProfile() });

      const previousProfile = queryClient.getQueryData(
        userKeys.currentProfile()
      );

      queryClient.setQueryData(
        userKeys.currentProfile(),
        (old: UserType | undefined) => {
          if (!old) return old;
          return { ...old, ...newData };
        }
      );

      return { previousProfile };
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.currentProfile(), updatedUser);
      queryClient.setQueryData(["auth", "user"], updatedUser);

      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>, newData, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          userKeys.currentProfile(),
          context.previousProfile
        );
      }

      toast.error(error.response?.data?.message || "Failed to update profile", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.followUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.profile(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.currentProfile() });

      const previousVisitedProfile = queryClient.getQueryData(
        userKeys.profile(userId)
      );
      const previousCurrentProfile = queryClient.getQueryData(
        userKeys.currentProfile()
      );

      queryClient.setQueryData(
        userKeys.profile(userId),
        (old: UserType | undefined) => {
          if (!old) return old;
          const currentUser = queryClient.getQueryData(
            userKeys.currentProfile()
          ) as UserType;
          if (!currentUser) return old;

          return {
            ...old,
            followers: [...old.followers, currentUser],
          };
        }
      );

      queryClient.setQueryData(
        userKeys.currentProfile(),
        (old: UserType | undefined) => {
          if (!old) return old;
          const visitedUser = queryClient.getQueryData(
            userKeys.profile(userId)
          ) as UserType;
          if (!visitedUser) return old;

          return {
            ...old,
            following: [...old.following, visitedUser],
          };
        }
      );

      return { previousVisitedProfile, previousCurrentProfile };
    },
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.currentProfile() });
    },
    onError: (error: AxiosError<{ message: string }>, userId, context) => {
      if (context?.previousVisitedProfile) {
        queryClient.setQueryData(
          userKeys.profile(userId),
          context.previousVisitedProfile
        );
      }
      if (context?.previousCurrentProfile) {
        queryClient.setQueryData(
          userKeys.currentProfile(),
          context.previousCurrentProfile
        );
      }

      toast.error(error.response?.data?.message || "Failed to follow user", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.unfollowUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.profile(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.currentProfile() });

      const previousVisitedProfile = queryClient.getQueryData(
        userKeys.profile(userId)
      );
      const previousCurrentProfile = queryClient.getQueryData(
        userKeys.currentProfile()
      );

      const currentUser = queryClient.getQueryData(
        userKeys.currentProfile()
      ) as UserType;

      queryClient.setQueryData(
        userKeys.profile(userId),
        (old: UserType | undefined) => {
          if (!old || !currentUser) return old;

          return {
            ...old,
            followers: old.followers.filter(
              (follower) => follower._id !== currentUser._id
            ),
          };
        }
      );

      queryClient.setQueryData(
        userKeys.currentProfile(),
        (old: UserType | undefined) => {
          if (!old) return old;

          return {
            ...old,
            following: old.following.filter(
              (followed) => followed._id !== userId
            ),
          };
        }
      );

      return { previousVisitedProfile, previousCurrentProfile };
    },
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.currentProfile() });
    },
    onError: (error: AxiosError<{ message: string }>, userId, context) => {
      if (context?.previousVisitedProfile) {
        queryClient.setQueryData(
          userKeys.profile(userId),
          context.previousVisitedProfile
        );
      }
      if (context?.previousCurrentProfile) {
        queryClient.setQueryData(
          userKeys.currentProfile(),
          context.previousCurrentProfile
        );
      }

      toast.error(error.response?.data?.message || "Failed to unfollow user", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};
