import type { TComment } from "../types";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface PostCommentProps {
  comment: TComment;
}

export const Comment = ({ comment }: PostCommentProps) => {
  return (
    <Flex key={comment.author.displayName} mb={3} align="start">
      <Avatar.Root size="sm" mr={2}>
        <Avatar.Image src={comment.author?.profilePicture} />
        <Avatar.Fallback name={comment.author.displayName} />
      </Avatar.Root>
      <Box>
        <Text fontSize="sm">
          <Text as="span" fontWeight="bold">
            {comment.author.displayName}
          </Text>{" "}
          <Text as="span">{comment.text}</Text>
        </Text>
      </Box>
    </Flex>
  );
};
