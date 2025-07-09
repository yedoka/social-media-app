import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "@/services/api/user";

export const useToggleFollow = (displayName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
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
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
    onError: (error) => {
      console.error("Error toggling follow state:", error);
    },
  });
};
