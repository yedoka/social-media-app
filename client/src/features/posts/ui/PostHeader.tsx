import { HStack, Avatar, Menu, Portal, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";

import type { UserType } from "@/shared/types";
import { usePostStore } from "../model/usePostStore";

interface PostHeaderProps {
  author: UserType;
  postId: string;
}

export const PostHeader = ({ author, postId }: PostHeaderProps) => {
  const { deletePost } = usePostStore();
  return (
    <HStack px={4} justifyContent="space-between">
      <Flex alignItems="center" gap={4}>
        <Avatar.Root size="xs">
          <Avatar.Image src={author.avatar} alt={author.name} />
          <Avatar.Fallback name={author.name} />
        </Avatar.Root>
        <Link to={`/user/${author.name}`}>{author.name}</Link>
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
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </HStack>
  );
};
