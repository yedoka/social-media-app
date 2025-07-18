import { HStack, Avatar, Menu, Portal, Flex, Text } from "@chakra-ui/react";
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
  const authUser = useAuthStore((state) => state.authUser);
  const { deletePost } = usePostStore();

  const isOwnPost = user._id === useAuthStore.getState().authUser?._id;
  const isOwnProfile = authUser?._id === user._id;
  const linkToProfile = isOwnProfile ? "/profile" : `/user/${user.name}`;

  return (
    <HStack justifyContent="space-between">
      <Flex alignItems="center" gap={3}>
        <Avatar.Root size="xs">
          <Avatar.Image src={user.avatar} alt={user.name} />
          <Avatar.Fallback name={user.name} />
        </Avatar.Root>
        <Link to={linkToProfile}>
          <Text fontSize="14px" fontWeight={600}>
            {user.name}
          </Text>
        </Link>
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
                >
                  Delete
                </Menu.Item>
              )}
              <Menu.Item value="viewProfile">
                <Link to={linkToProfile}>View Profile</Link>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </HStack>
  );
};
