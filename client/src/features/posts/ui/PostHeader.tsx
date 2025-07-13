import { HStack, Avatar, Menu, Portal, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Ellipsis } from "lucide-react";

import type { UserType } from "@/shared/types";
import { usePostStore } from "../model/usePostStore";
import { useAuthStore } from "@/features/auth/model/useAuthStore";

interface PostHeaderProps {
  user: UserType;
  postId: string;
}

export const PostHeader = ({ user, postId }: PostHeaderProps) => {
  const { deletePost } = usePostStore();
  const isOwnPost = user._id === useAuthStore.getState().authUser?._id;

  return (
    <HStack px={4} justifyContent="space-between">
      <Flex alignItems="center" gap={4}>
        <Avatar.Root size="xs">
          <Avatar.Image src={user.avatar} alt={user.name} />
          <Avatar.Fallback name={user.name} />
        </Avatar.Root>
        <Link to={`/user/${user.name}`}>{user.name}</Link>
      </Flex>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Ellipsis cursor="pointer" />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {isOwnPost && (
                <Menu.Item
                  value="delete"
                  color="fg.error"
                  onClick={() => deletePost(postId)}
                  cursor="pointer"
                >
                  Delete
                </Menu.Item>
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </HStack>
  );
};
