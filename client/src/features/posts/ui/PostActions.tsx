import { Heart, MessageCircle } from "lucide-react";
import { HStack } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";
import { useAuthUser } from "@/features/auth/model/useAuthStore";
import { usePostStore } from "../model/usePostStore";
import { checkIsLikedByUser } from "../lib";
import { PostDialog } from "./PostDialog";

interface PostActionsProps {
  post: PostType;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { posts, likePost, unlikePost } = usePostStore();
  const authUser = useAuthUser();

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
        color={isLikedByUser ? "red" : undefined}
      />
      <PostDialog
        post={updatedPost}
        trigger={<MessageCircle cursor="pointer" size={20} />}
      />
    </HStack>
  );
};
