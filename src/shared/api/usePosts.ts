import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/api/posts";

export const usePosts = () => {
  return useQuery({
    queryKey: ["feedPosts"],
    queryFn: getPosts,
  });
};
