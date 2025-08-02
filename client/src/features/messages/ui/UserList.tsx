import { useEffect } from "react";
import { Box, VStack, HStack, Avatar, Text } from "@chakra-ui/react";
import {
  useMessageActions,
  useMessageSelectedUser,
  useUsers,
} from "../model/messageStore";
import type { UserType } from "@/shared/types";

interface UserListProps {
  onUserSelect: (user: UserType) => void;
}

export const UserList = ({ onUserSelect }: UserListProps) => {
  const users = useUsers();
  const { getUsers } = useMessageActions();
  const selectedUser = useMessageSelectedUser();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box w="300px" borderRight="1px solid" borderColor="gray.900">
      <Box p={4}>
        <Text fontSize="xl" fontWeight="700">
          Messages
        </Text>
      </Box>
      <VStack gapY={2} align="stretch">
        {users.map((user) => (
          <HStack
            key={user._id}
            p={3}
            cursor="pointer"
            bg={selectedUser?._id === user._id ? "gray.800" : "transparent"}
            _hover={{ bg: "gray.800" }}
            onClick={() => onUserSelect(user)}
          >
            <Avatar.Root size="md">
              <Avatar.Image src={user.avatar} />
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
            <Text fontWeight="medium">{user.name}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
