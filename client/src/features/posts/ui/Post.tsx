import { Image, Stack } from "@chakra-ui/react";

import type { PostType } from "@/shared/types";

import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

interface PostProps {
  post: PostType;
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
      <PostHeader author={post.user} postId={post._id} />
      <Image src={post.image} alt={post.text} loading="lazy" w="lg" h="lg" />
      <PostFooter post={post} />
    </Stack>
  );
};
