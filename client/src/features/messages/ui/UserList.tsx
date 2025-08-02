import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useMessageUsers, useMessageClientStore } from "../model";
import type { UserType } from "@/shared/types";

interface UserListProps {
  onUserSelect: (user: UserType) => void;
}

export const UserList = ({ onUserSelect }: UserListProps) => {
  const { users, isLoading, isError } = useMessageUsers();
  const selectedUser = useMessageClientStore((state) => state.selectedUser);

  if (isLoading) {
    return (
      <Box w="300px" borderRight="1px solid" borderColor="gray.900">
        <Box p={4}>
          <Text fontSize="xl" fontWeight="700">
            Messages
          </Text>
        </Box>
        <Center p={8}>
          <Spinner size="md" />
        </Center>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box w="300px" borderRight="1px solid" borderColor="gray.900">
        <Box p={4}>
          <Text fontSize="xl" fontWeight="700">
            Messages
          </Text>
        </Box>
        <Center p={8}>
          <Text color="gray.500">Failed to load users</Text>
        </Center>
      </Box>
    );
  }

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
