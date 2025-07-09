import { useEffect } from "react";
import { usePosts } from "@/shared/api";
import { Post } from "@/features/posts/ui/Post";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PostSkeleton } from "@/features/posts/ui/PostSkeleton";
import { getPosts } from "@/services/api/posts";

export const Feed = () => {
  const { data: posts, isLoading, error } = usePosts();
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
  if (!posts || posts.length === 0) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Nothing to see here yet
        </Heading>
        <Text color={"gray.500"}>
          Follow other users or create your own posts to get started.
        </Text>
      </Box>
    );
  }

  return (
    <Stack w="full" align="center">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
};
