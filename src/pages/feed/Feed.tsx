import { useEffect } from "react";
import { usePost } from "@/hooks/usePost";
import { Post } from "@/features/posts/ui/Post";
import { Stack, Text } from "@chakra-ui/react";
import { PostSkeleton } from "@/features/posts/ui/PostSkeleton";
import { getPosts } from "@/services/api/posts";

export const Feed = () => {
  const { data: posts, isLoading, error } = usePost();
  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return (
      <Stack w="full" align="center">
        <PostSkeleton />
      </Stack>
    );
  }
  if (error) return <Text>Error occurred from feed</Text>;
  if (!posts || posts.length === 0) return <Text>No posts available</Text>;

  return (
    <Stack w="full" align="center">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
};
