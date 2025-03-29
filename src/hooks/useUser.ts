import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserByUsernameFunc, followUser, checkFollowStatus, unfollowUser } from "@/services/api/user";
import { auth } from "@/services/api/config";
import { User } from "@/types/user";
import { debounce } from "lodash";

export const useUser = (displayName: string) => {
  const queryClient = useQueryClient();

  const { data: userData, isLoading, error } = useQuery<User | null, Error>({
    queryKey: ["user", displayName],
    queryFn: () => fetchUserByUsernameFunc(displayName),
    enabled: !!displayName,
  });

  const { data: isFollowing, isLoading: isFollowStatusLoading } = useQuery<boolean, Error>({
    queryKey: ["followStatus", displayName],
    queryFn: () => checkFollowStatus(displayName),
    enabled: !!displayName && !!auth.currentUser,
  });

  const followMutation = useMutation({
    mutationFn: async (shouldFollow: boolean) => {
      if (shouldFollow) {
        await followUser(displayName);
      } else {
        await unfollowUser(displayName);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["user", displayName] });
      queryClient.invalidateQueries({ queryKey: ["followStatus", displayName] });
    },
    onError: (error) => {
      console.error("Error toggling follow state:", error);
    },
  });

  const debouncedToggleFollow = debounce(async (shouldFollow: boolean) => {
    await followMutation.mutateAsync(shouldFollow);
  }, 500);

  const toggleFollow = () => {
    if (!auth.currentUser) {
      return "You must be logged in to follow/unfollow users.";
    }
    debouncedToggleFollow(!isFollowing);
  };

  return {
    userData,
    isFollowing: isFollowing || false,
    error: error?.message || null,
    isLoading: isLoading || isFollowStatusLoading,
    toggleFollow,
  };
};