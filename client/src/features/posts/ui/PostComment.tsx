import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import type { CommentType } from "@/shared/types";

interface PostCommentProps {
  comment: CommentType;
}

export const PostComment = ({ comment }: PostCommentProps) => {
  return (
    <Flex key={comment.user.name} mb={3} align="start">
      <Avatar.Root size="sm" mr={2}>
        <Avatar.Image src={comment.user.avatar} />
        <Avatar.Fallback name={comment.user.name} />
      </Avatar.Root>
      <Box>
        <Text fontSize="sm">
          <Text as="span" fontWeight="bold">
            {comment.user.name}
          </Text>{" "}
          <Text as="span">{comment.text}</Text>
        </Text>
      </Box>
    </Flex>
  );
};
