import { Stack, Text } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostActions } from "./PostActions";

interface PostFooterProps {
  post: PostType;
}

export const PostFooter = ({ post }: PostFooterProps) => {
  return (
    <Stack px={4} fontSize="sm">
      <PostActions post={post} />
      {post.likes.length > 0 && (
        <Text>
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </Text>
      )}
      <Text>
        <Text as="span" fontWeight="bold">
          {post.author.displayName}
        </Text>{" "}
        {post.content}
      </Text>
    </Stack>
  );
};
