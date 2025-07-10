import { HStack, Avatar, Menu, Portal, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";

import { useDeletePost } from "../api";

interface PostHeaderProps {
  author: {
    displayName: string;
    profilePicture: string;
  };
  postId: string;
}

export const PostHeader = ({ author, postId }: PostHeaderProps) => {
  const { mutateAsync: deletePost } = useDeletePost();
  return (
    <HStack px={4} justifyContent="space-between">
      <Flex alignItems="center" gap={4}>
        <Avatar.Root size="xs">
          <Avatar.Image src={author.profilePicture} alt={author.displayName} />
          <Avatar.Fallback name={author.displayName} />
        </Avatar.Root>
        <Link to={`/user/${author.displayName}`}>{author.displayName}</Link>
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
                onClick={() => deletePost(postId)}
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
