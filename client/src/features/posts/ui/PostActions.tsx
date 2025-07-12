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
} from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostComments } from "./PostComments";
import { isPostLikedByUser, getLikesCount } from "../lib";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { usePostStore } from "../model/usePostStore";

interface PostActionsProps {
  post: PostType;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { likePost, unlikePost } = usePostStore();
  const { authUser } = useAuthStore();

  const isLikedByUser = authUser
    ? isPostLikedByUser(post, authUser._id)
    : false;

  const likesCount = getLikesCount(post);

  return (
    <HStack>
      <Heart
        onClick={() => likePost(post._id)}
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
                <Box bg="black">
                  <Image src={post.image} alt="Post" objectFit="contain" />
                </Box>
                <Flex
                  direction="column"
                  p={4}
                  overflow="hidden"
                  justify="space-between"
                >
                  <Box>
                    <Flex align="center" pb={4} borderBottomWidth="1px" mb={4}>
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
    </HStack>
  );
};
