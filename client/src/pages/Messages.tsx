import { useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { UserList, MessageContainer } from "@/features/messages/ui";
import { useMessageStore } from "@/features/messages/model/useMessageStore";
import { useAuthUser } from "@/features/auth/model/useAuthStore";
import type { UserType } from "@/shared/types";
import { io } from "socket.io-client";

export const Messages = () => {
  const { selectedUser, setSelectedUser, addMessage } = useMessageStore();
  const authUser = useAuthUser();

  useEffect(() => {
    if (!authUser) return;

    const socket = io("http://localhost:5000", {
      query: { userId: authUser._id },
    });

    socket.on("newMessage", (message) => {
      addMessage(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [authUser, addMessage]);

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
  };

  return (
    <Box h="calc(100vh - 80px)" display="flex">
      <UserList onUserSelect={handleUserSelect} />
      {selectedUser ? (
        <MessageContainer selectedUser={selectedUser} />
      ) : (
        <Center flex={1}>
          <Text color="gray.500" fontSize="2xl">
            Select a user to start messaging
          </Text>
        </Center>
      )}
    </Box>
  );
};
