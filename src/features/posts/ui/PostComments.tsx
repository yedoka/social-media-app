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
      <Text fontWeight="semibold" mb={2}>
        Comments
      </Text>
      <Box maxH="300px" overflowY="auto" pr={2}>
        {post.comments.length !== 0 &&
          post.comments.map((comment) => (
            <PostComment key={comment.text} comment={comment} />
          ))}
        <PostCommentInput post={post} />
      </Box>
    </Box>
  );
};
