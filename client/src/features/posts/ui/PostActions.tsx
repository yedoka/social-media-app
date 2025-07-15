import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import {
  HStack,
  Dialog,
  Portal,
  Flex,
  Box,
  Image,
  Text,
  Avatar,
  CloseButton,
} from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostComments } from "./PostComments";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { usePostStore } from "../model/usePostStore";
import { checkIsLikedByUser } from "../lib";

interface PostActionsProps {
  post: PostType;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { posts, likePost, unlikePost } = usePostStore();
  const { authUser } = useAuthStore();

  const updatedPost = posts.find((p) => p._id === post._id) || post;

  const isLikedByUser = checkIsLikedByUser(
    updatedPost.likes,
    authUser?._id || ""
  );

  const handlePostLike = (postId: string) => {
    if (isLikedByUser) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  return (
    <HStack>
      <Heart
        onClick={() => handlePostLike(post._id)}
        fill={isLikedByUser ? "red" : "none"}
        size={20}
        cursor="pointer"
      />
      <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          {<MessageCircle cursor="pointer" size={20} />}
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="sm">
              <Flex>
                <Image src={post.image} alt="Post" objectFit="contain" />
                <Flex
                  direction="column"
                  p={4}
                  overflow="hidden"
                  justify="space-between"
                  flex="1"
                >
                  <Box>
                    <Flex align="center" pb={4} borderBottomWidth="1px" mb={4}>
                      <Avatar.Root size="xs" mr={3}>
                        <Avatar.Image src={post.user.avatar} />
                        <Avatar.Fallback name={post.user.name} />
                      </Avatar.Root>
                      <Link to={`/user/${post.user.name}`}>
                        <Text fontWeight="bold">{post.user.name}</Text>
                      </Link>
                    </Flex>
                    <Text>
                      <Text as="span" fontWeight={600}>
                        {post.user.name}{" "}
                      </Text>
                      {post.text}
                    </Text>
                  </Box>
                  <PostComments post={post} />
                </Flex>
              </Flex>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
