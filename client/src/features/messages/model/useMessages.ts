import {
  useMessageUsersQuery,
  useMessagesQuery,
  useSendMessageMutation,
  useAddMessageMutation,
} from "../api/messageQueries";
import type { SendMessageData } from "../api/messageApi";
import type { MessageType } from "@/shared/types";
import { useMessageClientStore } from "../model/messageClientStore";

export const useMessageUsers = () => {
  const { data: users, isLoading, error, refetch } = useMessageUsersQuery();

  return {
    users: users || [],
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};

export const useMessages = (userId: string) => {
  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useMessagesQuery(userId);

  return {
    messages: messages || [],
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};

export const useMessageActions = () => {
  const sendMessageMutation = useSendMessageMutation();
  const addMessageMutation = useAddMessageMutation();

  return {
    sendMessage: (userId: string, data: SendMessageData) =>
      sendMessageMutation.mutate({ userId, data }),
    addMessage: (userId: string, message: MessageType) =>
      addMessageMutation.mutate({ userId, message }),

    isSendingMessage: sendMessageMutation.isPending,

    isPending: sendMessageMutation.isPending,
  };
};

export const useSendMessage = () => {
  const mutation = useSendMessageMutation();
  return {
    sendMessage: (userId: string, data: SendMessageData) =>
      mutation.mutate({ userId, data }),
    isSending: mutation.isPending,
    error: mutation.error,
  };
};

export const useAddMessage = () => {
  const mutation = useAddMessageMutation();
  return {
    addMessage: (userId: string, message: MessageType) =>
      mutation.mutate({ userId, message }),
  };
};

export { useMessageClientStore };
