import type { UserType } from "@/shared/types";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useFollowUser } from "../model/useProfile";

interface ProfileUserListProps {
  users: UserType[];
  type: "followers" | "following";
}

export const ProfileUserList = ({ users, type }: ProfileUserListProps) => {
  const { username } = useParams();
  const { unfollowUser, isUnfollowing } = useFollowUser();

  return (
    <Box minHeight="300px" maxHeight="400px" overflowY="auto" px={4}>
      {users.length > 0 ? (
        users.map((user) => (
          <Flex key={user._id} p={2} alignItems="center">
            <Flex flex={1} gap={3} alignItems="center">
              <Link to={`/user/${user.name}`}>
                <Avatar.Root size="sm">
                  <Avatar.Image src={user.avatar} alt={user.name} />
                  <Avatar.Fallback name={user.name} />
                </Avatar.Root>
              </Link>
              <Link to={`/user/${user.name}`}>
                <Text fontWeight={600}>{user.name}</Text>
              </Link>
            </Flex>
            {!username && type === "following" && (
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={() => unfollowUser(user._id)}
                disabled={isUnfollowing}
              >
                {isUnfollowing ? "Unfollowing..." : "Unfollow"}
              </Button>
            )}
          </Flex>
        ))
      ) : (
        <Box textAlign="center" py={8} color="gray.500">
          No followers yet
        </Box>
      )}
    </Box>
  );
};
