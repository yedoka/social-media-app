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

import { TPost } from "@/shared/types";

import { Comments } from "./PostComments";
import { useLikePost } from "../api/usePostActions";

interface PostActionsProps {
  post: TPost;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { mutateAsync: likePost } = useLikePost();

  return (
    <HStack>
      <Heart
        onClick={() => likePost(post.id)}
        fill={post.isLikedByUser ? "red" : "none"}
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
                  <Image src={post.imageUrl} alt="Post" objectFit="contain" />
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
                        <Avatar.Image src={post.author.profilePicture} />
                        <Avatar.Fallback name={post.author.displayName} />
                      </Avatar.Root>
                      <Link to={`/user/${post.author.displayName}`}>
                        <Text fontWeight="bold">{post.author.displayName}</Text>
                      </Link>
                    </Flex>
                    <Text>{post.content}</Text>
                  </Box>
                  <Comments post={post} />
                </Flex>
              </Flex>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
