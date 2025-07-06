import { HStack, Avatar, Menu, Portal, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";

import { usePost } from "@/hooks/usePost";

import type { TPost } from "@/shared/types";

interface PostHeaderProps {
  post: TPost;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const { handleDeletePost } = usePost();
  return (
    <HStack px={4} justifyContent="space-between">
      <Flex alignItems="center" gap={4}>
        <Avatar.Root size="xs">
          <Avatar.Image
            src={post.author.profilePicture}
            alt={post.author.displayName}
          />
          <Avatar.Fallback name={post.author.displayName} />
        </Avatar.Root>
        <Link to={`user/${post.author.displayName}`}>
          {post.author.displayName}
        </Link>
      </Flex>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Ellipsis cursor="pointer" />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="delete"
                color="fg.error"
                onClick={() => handleDeletePost(post.id)}
                cursor="pointer"
              >
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </HStack>
  );
};
