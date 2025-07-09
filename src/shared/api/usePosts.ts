import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/api/posts";

export const usePosts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["feedPosts"],
    queryFn: getPosts,
  });

  return {
    data,
    isLoading,
    error,
  };
};
