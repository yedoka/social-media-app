import { Stack, Text } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostActions } from "./PostActions";
import { getLikesCount } from "../lib";

interface PostFooterProps {
  post: PostType;
}

export const PostFooter = ({ post }: PostFooterProps) => {
  const likesCount = getLikesCount(post);

  return (
    <Stack fontSize="sm">
      <PostActions post={post} />
      {post.likes.length > 0 && (
        <Text>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </Text>
      )}
      <Text>
        <Text as="span" fontWeight="600">
          {post.user.name}
        </Text>{" "}
        {post.text}
      </Text>
    </Stack>
  );
};
