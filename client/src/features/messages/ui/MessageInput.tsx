import { useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";
import { Send } from "lucide-react";
import { useSendMessage } from "../model";

interface MessageInputProps {
  userId: string;
}

export const MessageInput = ({ userId }: MessageInputProps) => {
  const [text, setText] = useState("");
  const { sendMessage, isSending } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage(userId, { text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack p={4} borderTop="1px" borderColor="gray.200">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          flex={1}
          disabled={isSending}
        />
        <Button
          type="submit"
          colorScheme="blue"
          disabled={!text.trim() || isSending}
        >
          <Send size={16} />
        </Button>
      </HStack>
    </form>
  );
};
