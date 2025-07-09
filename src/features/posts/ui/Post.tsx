import { Image, Stack } from "@chakra-ui/react";
import type { TPost } from "@/shared/types";

import { PostHeader } from "@/features/posts/ui/PostHeader";
import { PostFooter } from "@/features/posts/ui/PostFooter";

interface PostProps {
  post: TPost;
}

export const Post = ({ post }: PostProps) => {
  return (
    <Stack
      gap={4}
      w="lg"
      border="1px solid"
      borderColor="gray.800"
      borderRadius="sm"
      py="4"
      mb="4"
    >
      <PostHeader author={post.author} postId={post.id} />
      <Image
        src={post.imageUrl}
        alt={post.content}
        loading="lazy"
        w="lg"
        h="lg"
      />
      <PostFooter post={post} />
    </Stack>
  );
};
