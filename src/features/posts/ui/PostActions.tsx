import { Heart, MessageCircle } from "lucide-react";
import { HStack } from "@chakra-ui/react";

import { usePost } from "@/hooks/usePost";
import { PostDialog } from "./PostDialog";
import { TPost } from "@/shared/types";

interface PostActionsProps {
  post: TPost;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { handleLikePost } = usePost();

  return (
    <HStack>
      <Heart
        onClick={() => handleLikePost(post.id)}
        fill={post.isLikedByUser ? "red" : "none"}
        size={20}
        cursor="pointer"
      />
      <PostDialog
        post={post}
        trigger={<MessageCircle size={20} cursor="pointer" />}
      />
    </HStack>
  );
};
