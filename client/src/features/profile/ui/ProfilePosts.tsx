import {
  Box,
  Grid,
  Image,
  Flex,
  AspectRatio,
  Spinner,
  Container,
  useBreakpointValue,
  Dialog,
  Portal,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import type { UserType } from "@/shared/types";
import { useProfilePosts } from "@/shared/api";
import { PostComments } from "@/features/posts/ui";

interface PostsProps {
  user: UserType;
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
            <Dialog.Root
              size="xl"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <Dialog.Trigger asChild>
                {
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
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop
                  bg="blackAlpha.600"
                  backdropFilter="blur(4px)"
                />
                <Dialog.Positioner>
                  <Dialog.Content borderRadius="sm">
                    <Flex>
                      <Box bg="black">
                        <Image
                          src={post.imageUrl}
                          alt="Post"
                          objectFit="contain"
                        />
                      </Box>
                      <Flex
                        direction="column"
                        p={4}
                        overflow="hidden"
                        justify="space-between"
                      >
                        <Box>
                          <Flex
                            align="center"
                            pb={4}
                            borderBottomWidth="1px"
                            mb={4}
                          >
                            <Avatar.Root size="md" mr={3}>
                              <Avatar.Image src={post.author.profilePicture} />
                              <Avatar.Fallback name={post.author.displayName} />
                            </Avatar.Root>
                            <Link to={`/user/${post.author.displayName}`}>
                              <Text fontWeight="bold">
                                {post.author.displayName}
                              </Text>
                            </Link>
                          </Flex>
                          <Text>{post.content}</Text>
                        </Box>
                        <PostComments post={post} />
                      </Flex>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
