import { getUserPosts } from "@/services/api/posts";
import { User } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useProfilePosts = (user: User) => {
  return useQuery({
    queryKey: ["profilePosts", user.id],
    queryFn: () => getUserPosts(user.email),
    enabled: !!user.posts?.length,
  });
};
