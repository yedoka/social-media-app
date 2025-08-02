import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageApi, type SendMessageData } from "./messageApi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { MessageType, UserType } from "@/shared/types";

export const messageKeys = {
  all: ["messages"] as const,
  users: () => [...messageKeys.all, "users"] as const,
  conversations: () => [...messageKeys.all, "conversations"] as const,
  conversation: (userId: string) =>
    [...messageKeys.conversations(), userId] as const,
};

export const useMessageUsersQuery = () => {
  return useQuery({
    queryKey: messageKeys.users(),
    queryFn: messageApi.getUsers,
  });
};

export const useMessagesQuery = (userId: string) => {
  return useQuery({
    queryKey: messageKeys.conversation(userId),
    queryFn: () => messageApi.getMessages(userId),
    enabled: !!userId,
    staleTime: 1000 * 30,
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: SendMessageData }) =>
      messageApi.sendMessage(userId, data),
    onMutate: async ({ userId, data }) => {
      await queryClient.cancelQueries({
        queryKey: messageKeys.conversation(userId),
      });

      const previousMessages = queryClient.getQueryData(
        messageKeys.conversation(userId)
      );

      const currentUser = queryClient.getQueryData(["auth", "user"]) as any;

      if (currentUser) {
        const optimisticMessage: MessageType = {
          _id: `temp-${Date.now()}`,
          senderId: currentUser,
          receiverId: { _id: userId } as UserType,
          text: data.text,
          isRead: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        queryClient.setQueryData(
          messageKeys.conversation(userId),
          (old: MessageType[] | undefined) => {
            return old ? [...old, optimisticMessage] : [optimisticMessage];
          }
        );
      }

      return { previousMessages };
    },
    onSuccess: (newMessage, { userId }) => {
      queryClient.setQueryData(
        messageKeys.conversation(userId),
        (old: MessageType[] | undefined) => {
          if (!old) return [newMessage];

          return old.map((msg) =>
            msg._id.startsWith("temp-") ? newMessage : msg
          );
        }
      );

      queryClient.invalidateQueries({ queryKey: messageKeys.users() });
    },
    onError: (error: AxiosError<{ message: string }>, { userId }, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          messageKeys.conversation(userId),
          context.previousMessages
        );
      }

      toast.error(error.response?.data?.message || "Failed to send message", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useAddMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ message }: { userId: string; message: MessageType }) =>
      Promise.resolve(message),
    onSuccess: (message, { userId }) => {
      queryClient.setQueryData(
        messageKeys.conversation(userId),
        (old: MessageType[] | undefined) => {
          return old ? [...old, message] : [message];
        }
      );

      queryClient.invalidateQueries({ queryKey: messageKeys.users() });
    },
  });
};
