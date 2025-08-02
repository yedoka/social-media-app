import { Box, Text, HStack, Avatar } from "@chakra-ui/react";
import { useAuthUser } from "@/features/auth/model/authStore";
import type { MessageType } from "@/shared/types";

interface MessageBoxProps {
  message: MessageType;
}

export const MessageBox = ({ message }: MessageBoxProps) => {
  const authUser = useAuthUser();
  const isFromMe = message.senderId._id === authUser?._id;

  return (
    <HStack justify={isFromMe ? "flex-end" : "flex-start"} mb={3} align="end">
      {!isFromMe && (
        <Avatar.Root size="sm">
          <Avatar.Image src={message.senderId.avatar} />
          <Avatar.Fallback name={message.senderId.name} />
        </Avatar.Root>
      )}
      <Box
        maxW="70%"
        bg={isFromMe ? "blue.500" : "gray.100"}
        color={isFromMe ? "white" : "black"}
        px={3}
        py={2}
        borderRadius="lg"
        borderBottomRightRadius={isFromMe ? "sm" : "lg"}
        borderBottomLeftRadius={isFromMe ? "lg" : "sm"}
      >
        <Text fontSize="sm">{message.text}</Text>
        <Text
          fontSize="xs"
          color={isFromMe ? "whiteAlpha.700" : "gray.500"}
          mt={1}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Box>
      {isFromMe && (
        <Avatar.Root size="sm">
          <Avatar.Image src={authUser?.avatar} />
          <Avatar.Fallback name={authUser?.name} />
        </Avatar.Root>
      )}
    </HStack>
  );
};
