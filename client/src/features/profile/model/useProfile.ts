import {
  useCurrentUserProfileQuery,
  useUserProfileQuery,
  useSearchUsersQuery,
  useSuggestedUsersQuery,
  useUpdateProfileMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../api/userQueries";
import type { UpdateProfileData } from "../api/userApi";

export const useCurrentProfile = () => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useCurrentUserProfileQuery();

  return {
    profile,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};

export const useUserProfile = (userId: string) => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useUserProfileQuery(userId);

  return {
    profile,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};

export const useUserSearch = (query: string) => {
  const { data: results, isLoading, error } = useSearchUsersQuery(query);

  return {
    results: results || [],
    isLoading,
    isError: !!error,
    error,
  };
};

export const useSuggestedUsers = () => {
  const { data: users, isLoading, error, refetch } = useSuggestedUsersQuery();

  return {
    users: users || [],
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};

export const useProfileActions = () => {
  const updateProfileMutation = useUpdateProfileMutation();
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();

  return {
    updateProfile: (data: UpdateProfileData) =>
      updateProfileMutation.mutate(data),
    followUser: (userId: string) => followUserMutation.mutate(userId),
    unfollowUser: (userId: string) => unfollowUserMutation.mutate(userId),

    isUpdatingProfile: updateProfileMutation.isPending,
    isFollowingUser: followUserMutation.isPending,
    isUnfollowingUser: unfollowUserMutation.isPending,

    isPending:
      updateProfileMutation.isPending ||
      followUserMutation.isPending ||
      unfollowUserMutation.isPending,
  };
};

export const useUpdateProfile = () => {
  const mutation = useUpdateProfileMutation();
  return {
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};

export const useFollowUser = () => {
  const followMutation = useFollowUserMutation();
  const unfollowMutation = useUnfollowUserMutation();

  return {
    followUser: followMutation.mutate,
    unfollowUser: unfollowMutation.mutate,
    isFollowing: followMutation.isPending,
    isUnfollowing: unfollowMutation.isPending,
    isToggling: followMutation.isPending || unfollowMutation.isPending,
  };
};
