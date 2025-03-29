import { fetchUserPosts } from '@/services/api/posts';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useProfilePosts = (user: User) => {
  return useQuery({
    queryKey: ['profilePosts'],
    queryFn: () => fetchUserPosts(user.posts),
    enabled: !!user.posts?.length
  })
};
