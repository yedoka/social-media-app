import { Box, Text } from "@chakra-ui/react";
import { TPost } from "@/shared/types";
import { Comment } from "./PostComment";
import { CommentInput } from "./PostCommentInput";

interface PostComponentsProps {
  post: TPost;
}

export const Comments = ({ post }: PostComponentsProps) => {
  return (
    <Box>
      <Text fontWeight="semibold" mb={2}>
        Comments
      </Text>
      <Box maxH="300px" overflowY="auto" pr={2}>
        {post.comments.length !== 0 &&
          post.comments.map((comment) => (
            <Comment key={comment.text} comment={comment} />
          ))}
        <CommentInput post={post} />
      </Box>
    </Box>
  );
};
