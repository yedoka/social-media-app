import { useEffect, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  useMessageIsLoading,
  useMessageActions,
  useMessages,
} from "../model/useMessageStore";
import { MessageBox } from "./MessageBox";
import { MessageInput } from "./MessageInput";
import type { UserType } from "@/shared/types";

interface MessageContainerProps {
  selectedUser: UserType;
}

export const MessageContainer = ({ selectedUser }: MessageContainerProps) => {
  const { getMessages } = useMessageActions();
  const messages = useMessages();
  const isLoading = useMessageIsLoading();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size="md" />
      </Center>
    );
  }

  return (
    <Box flex={1} display="flex" flexDirection="column" h="100%">
      <HStack p={4} borderBottom="1px" borderColor="gray.200">
        <Avatar.Root size="md">
          <Avatar.Image src={selectedUser.avatar} />
          <Avatar.Fallback name={selectedUser.name} />
        </Avatar.Root>
        <VStack align="start" gap={0}>
          <Text fontWeight="bold">{selectedUser.name}</Text>
        </VStack>
      </HStack>

      <Box flex={1} overflowY="auto" p={4} backgroundColor={"gray.900"}>
        <VStack gap={2} align="stretch">
          {messages.map((message) => (
            <MessageBox key={message._id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      <MessageInput userId={selectedUser._id} />
    </Box>
  );
};
