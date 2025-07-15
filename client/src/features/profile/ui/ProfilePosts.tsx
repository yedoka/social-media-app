import {
  Box,
  Grid,
  Image,
  AspectRatio,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";

import type { UserType } from "@/shared/types";
import { PostDialog } from "@/features/posts/ui";

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
            <PostDialog
              post={post}
              trigger={
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
            />
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
