import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "@/features/posts/ui/Post";
import { Box, Heading, Stack, Text, Spinner, Center } from "@chakra-ui/react";
import { PostSkeleton } from "@/features/posts/ui/PostSkeleton";
import { usePostStore } from "@/features/posts/model/usePostStore";

export const Feed = () => {
  const { posts, pagination, isLoadingInitial, getPosts, loadMorePosts } =
    usePostStore();

  useEffect(() => {
    getPosts(1);
  }, [getPosts]);

  if (isLoadingInitial) {
    return (
      <Stack w="full" align="center" gap={4}>
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
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
    <Box w="full">
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={pagination?.hasMore ?? false}
        loader={
          <Center py={4}>
            <Spinner size="md" />
          </Center>
        }
        endMessage={
          <Center py={8}>
            <Text color="gray.500" fontSize="sm">
              You've seen all posts! Time to follow more users or create some
              content.
            </Text>
          </Center>
        }
        refreshFunction={() => getPosts(1)}
        pullDownToRefresh={true}
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <Center py={4}>
            <Text color="gray.500">Pull down to refresh</Text>
          </Center>
        }
        releaseToRefreshContent={
          <Center py={4}>
            <Text color="gray.500">Release to refresh</Text>
          </Center>
        }
      >
        <Stack w="full" align="center" gap={4}>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </Stack>
      </InfiniteScroll>
    </Box>
  );
};
