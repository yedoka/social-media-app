import { auth } from "@/services/api/config";
import {
  checkFollowStatus,
  followUser,
  unfollowUser,
} from "@/services/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

export const useFollow = (displayName: string) => {
  const queryClient = useQueryClient();
  const currentUser = auth.currentUser;
  const isOwnProfile = currentUser?.displayName === displayName;

  const { data: isFollowing, isLoading: isFollowStatusLoading } = useQuery<
    boolean,
    Error
  >({
    queryKey: ["followStatus", displayName],
    queryFn: () => checkFollowStatus(displayName),
    enabled: !!displayName && !!currentUser && !isOwnProfile,
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
      queryClient.invalidateQueries({
        queryKey: ["followStatus", displayName],
      });
    },
    onError: (error) => {
      console.error("Error toggling follow state:", error);
    },
  });

  const debouncedToggleFollow = debounce(async (shouldFollow: boolean) => {
    await followMutation.mutateAsync(shouldFollow);
  }, 500);

  const toggleFollow = () => {
    if (!currentUser) {
      return "You must be logged in to follow/unfollow users.";
    }

    if (isOwnProfile) {
      return "You cannot follow yourself.";
    }

    debouncedToggleFollow(!isFollowing);
  };

  return {
    isOwnProfile,
    isFollowing,
    toggleFollow,
    isFollowStatusLoading,
  };
};
