import { Box, Text } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostComment } from "./PostComment";
import { PostCommentInput } from "./PostCommentInput";

interface PostComponentsProps {
  post: PostType;
}

export const PostComments = ({ post }: PostComponentsProps) => {
  return (
    <Box>
      {post.comments.map((comment) => (
        <PostComment key={comment._id} comment={comment} />
      ))}
    </Box>
  );
};
