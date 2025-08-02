import apiClient from "@/services/api/apiClient";
import type { MessageType, UserType } from "@/shared/types";

export interface SendMessageData {
  text: string;
}

export const messageApi = {
  getUsers: async (): Promise<UserType[]> => {
    const response = await apiClient.get("/messages/users");
    return response.data;
  },

  getMessages: async (userId: string): Promise<MessageType[]> => {
    const response = await apiClient.get(`/messages/${userId}`);
    return response.data;
  },

  sendMessage: async (
    userId: string,
    data: SendMessageData
  ): Promise<MessageType> => {
    const response = await apiClient.post(`/messages/send/${userId}`, data);
    return response.data;
  },
};
