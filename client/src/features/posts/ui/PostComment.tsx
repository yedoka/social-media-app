import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import type { CommentType } from "@/shared/types";

interface PostCommentProps {
  comment: CommentType;
}

export const PostComment = ({ comment }: PostCommentProps) => {
  return (
    <Flex key={comment.user.name} mb={3} align="center">
      <Avatar.Root size="sm" mr={2}>
        <Avatar.Image src={comment.user.avatar} />
        <Avatar.Fallback name={comment.user.name} />
      </Avatar.Root>
      <Box>
        <Text fontSize="sm">
          <Text as="span" fontWeight={600}>
            {comment.user.name}{" "}
          </Text>
          {comment.text}
        </Text>
      </Box>
    </Flex>
  );
};
