import { useEffect } from "react";
import { Post } from "@/features/posts/ui/Post";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PostSkeleton } from "@/features/posts/ui/PostSkeleton";
import { usePostStore } from "@/features/posts/model/usePostStore";

export const Feed = () => {
  const { posts, getPosts, isPending } = usePostStore();

  useEffect(() => {
    getPosts();
  }, []);

  if (isPending) {
    return (
      <Stack w="full" align="center">
        <PostSkeleton />
      </Stack>
    );
  }
  if (!posts || posts.length === 0) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Nothing to see here yet
        </Heading>
        <Text color="gray.500">
          Follow other users or create your own posts to get started.
        </Text>
      </Box>
    );
  }

  return (
    <Stack w="full" align="center">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Stack>
  );
};
