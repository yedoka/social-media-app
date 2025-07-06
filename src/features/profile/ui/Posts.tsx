import { User } from "@/types/user";
import {
  Box,
  Grid,
  Image,
  Flex,
  AspectRatio,
  Spinner,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useProfilePosts } from "@/hooks/useProfilePosts";
import { PostDialog } from "@/features/posts/ui/PostDialog";

interface PostsProps {
  user: User;
}

export const Posts = ({ user }: PostsProps) => {
  const { data: posts, isLoading, isError, error } = useProfilePosts(user);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  if (isLoading) {
    return (
      <Flex justify="center" py={8}>
        <Spinner color="gray.500" size="lg" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={8} color="red.500">
        {error.message || "Failed to load posts"}
      </Box>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Box textAlign="center" py={8} color="gray.500">
        No posts yet
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" px={{ base: 2, md: 4 }}>
      <Grid
        templateColumns={`repeat(${columns}, 1fr)`}
        gap={{ base: 2, md: 4 }}
        w="100%"
        borderTopWidth="1px"
        pt={8}
      >
        {posts.map((post) => (
          <Box key={post.id} borderRadius="lg" overflow="hidden">
            <PostDialog
              post={post}
              trigger={
                <AspectRatio ratio={1}>
                  <Image
                    src={post.imageUrl}
                    alt={post.content}
                    objectFit="cover"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
                  />
                </AspectRatio>
              }
            />
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
