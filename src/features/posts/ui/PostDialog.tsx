import { ReactNode } from "react";
import {
  Dialog,
  Portal,
  Flex,
  Box,
  Image,
  Text,
  Avatar,
  Highlight,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import type { TPost } from "@/shared/types";
import { Comments } from "./PostComments";

interface PostDialogProps {
  post: TPost;
  trigger: ReactNode;
}

export const PostDialog = ({ post, trigger }: PostDialogProps) => {
  const authorName = post?.author?.displayName || "Unknown User";
  const authorPicture = post?.author?.profilePicture;

  return (
    <Dialog.Root size="lg" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="sm" maxW="9/12">
            <Flex
              direction={{ base: "column", md: "row" }}
              maxH={{ md: "90vh" }}
            >
              <Box maxH="90vh" bg="black">
                <Image
                  src={post.imageUrl}
                  alt="Post"
                  objectFit="contain"
                  maxH="full"
                  w="100%"
                />
              </Box>
              <Flex
                flex="2"
                direction="column"
                p={4}
                maxH={{ md: "90vh" }}
                overflow="hidden"
              >
                <Flex align="center" pb={4} borderBottomWidth="1px" mb={4}>
                  <Avatar.Root size="md" mr={3}>
                    <Avatar.Image src={authorPicture} />
                    <Avatar.Fallback name={authorName} />
                  </Avatar.Root>
                  <Link to={`/user/${authorName}`}>
                    <Text fontWeight="bold">{authorName}</Text>
                  </Link>
                </Flex>
                <Box mb={6}>
                  <Highlight query={authorName}>{post.content}</Highlight>
                </Box>
                <Comments post={post} />
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
