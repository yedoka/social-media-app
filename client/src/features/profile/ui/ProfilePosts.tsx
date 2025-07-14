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
import { PostComments } from "@/features/posts/ui";

interface PostsProps {
  user: UserType;
}

export const ProfilePosts = ({ user }: PostsProps) => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  if (!user.posts || user.posts.length === 0) {
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
        {user.posts.map((post) => (
          <Box key={post._id} borderRadius="lg" overflow="hidden">
            <Dialog.Root
              size="xl"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <Dialog.Trigger asChild>
                {
                  <AspectRatio ratio={1}>
                    <Image
                      src={post.image}
                      alt={post.text}
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
                          src={post.image}
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
                              <Avatar.Image src={post.user.avatar} />
                              <Avatar.Fallback name={post.user.name} />
                            </Avatar.Root>
                            <Link to={`/user/${post.user.name}`}>
                              <Text fontWeight="bold">{post.user.name}</Text>
                            </Link>
                          </Flex>
                          <Text>{post.text}</Text>
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
