import { Link } from "react-router-dom";
import { Avatar, HStack, Text, Box } from "@chakra-ui/react";

import type { UserType } from "@/shared/types";
import { useAuthUser } from "@/features/auth/model/useAuthStore";

interface UserListProps {
  foundUsers: UserType[];
  onUserSelect: () => void;
  maxResults?: number;
}

export const UserList = ({
  foundUsers,
  onUserSelect,
  maxResults = 5,
}: UserListProps) => {
  if (!foundUsers || foundUsers.length === 0) {
    return null;
  }
  const authUser = useAuthUser();

  const displayUsers = foundUsers.slice(0, maxResults);
  const hasMoreResults = foundUsers.length > maxResults;

  const checkIsOwnProfile = (user: UserType) => {
    return authUser && user._id === authUser._id;
  };

  return (
    <Box>
      {displayUsers.map((item) => (
        <Link
          to={checkIsOwnProfile(item) ? "/profile" : `/user/${item.name}`}
          key={item._id}
          onClick={onUserSelect}
        >
          <HStack
            p={3}
            _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
            borderRadius="md"
            transition="all 0.2s"
            cursor="pointer"
          >
            <Avatar.Root size="sm">
              <Avatar.Image src={item.avatar} alt={item.name} />
              <Avatar.Fallback name={item.name} />
            </Avatar.Root>
            <Box flex="1">
              <Text fontWeight="medium" fontSize="sm">
                {item.name}
              </Text>
              {item.bio && (
                <Text
                  fontSize="xs"
                  color="gray.500"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.bio}
                </Text>
              )}
            </Box>
          </HStack>
        </Link>
      ))}

      {hasMoreResults && (
        <Text fontSize="xs" color="gray.500" textAlign="center" py={2}>
          +{foundUsers.length - maxResults} more results
        </Text>
      )}
    </Box>
  );
};
