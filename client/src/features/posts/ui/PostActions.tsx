import { Heart, MessageCircle } from "lucide-react";
import { HStack } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";
import { useAuthUser } from "@/features/auth";
import { useLikePost } from "../model";
import { checkIsLikedByUser } from "../lib";
import { PostDialog } from "./PostDialog";

interface PostActionsProps {
  post: PostType;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { likePost, unlikePost, isToggling } = useLikePost();
  const authUser = useAuthUser();

  const isLikedByUser = checkIsLikedByUser(post.likes, authUser?._id || "");

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
        color={isLikedByUser ? "red" : undefined}
        opacity={isToggling ? 0.5 : 1}
      />
      <PostDialog
        post={post}
        trigger={<MessageCircle cursor="pointer" size={20} />}
      />
    </HStack>
  );
};
