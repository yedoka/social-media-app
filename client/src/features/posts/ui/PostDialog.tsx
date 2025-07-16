import { Link } from "react-router-dom";
import {
  Dialog,
  Portal,
  Flex,
  Image,
  Text,
  Avatar,
  CloseButton,
  Box,
} from "@chakra-ui/react";

import type { PostType } from "@/shared/types";
import { PostComments } from "./PostComments";
import { PostCommentInput } from "./PostCommentInput";

interface PostDialogProps {
  post: PostType;
  trigger: React.ReactNode;
}

export const PostDialog = ({ post, trigger }: PostDialogProps) => {
  return (
    <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="sm">
            <Flex>
              <Image
                src={post.image}
                alt="Post"
                objectFit="cover"
                maxWidth="500px"
              />
              <Flex
                direction="column"
                p={4}
                overflow="hidden"
                justify="space-between"
                flex="1"
              >
                <Flex align="center" pb={4}>
                  <Avatar.Root size="xs" mr={3}>
                    <Avatar.Image src={post.user.avatar} />
                    <Avatar.Fallback name={post.user.name} />
                  </Avatar.Root>
                  <Link to={`/user/${post.user.name}`}>
                    <Text fontWeight="bold">{post.user.name}</Text>
                  </Link>
                </Flex>
                <Flex
                  gap={3}
                  direction="column"
                  overflow="auto"
                  maxHeight="560px"
                  scrollbar="hidden"
                  py={4}
                >
                  <Text mb={4}>
                    <Text as="span" fontWeight={600}>
                      {post.user.name}{" "}
                    </Text>
                    {post.text}
                  </Text>
                  <PostComments post={post} />
                </Flex>
                <Box pt="4">
                  <PostCommentInput postId={post._id} />
                </Box>
              </Flex>
            </Flex>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
