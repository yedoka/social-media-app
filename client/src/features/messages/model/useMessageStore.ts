import { create } from "zustand";
import apiClient from "@/services/api/apiClient";
import type { MessageType, UserType } from "@/shared/types";

interface MessageStore {
  messages: MessageType[];
  users: UserType[];
  selectedUser: UserType | null;
  isLoading: boolean;
  error: string | null;

  actions: {
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (userId: string, text: string) => Promise<void>;
    setSelectedUser: (user: UserType | null) => void;
    addMessage: (message: MessageType) => void;
    clearMessages: () => void;
  };
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  actions: {
    getUsers: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await apiClient.get("/messages/users");
        set({ users: response.data });
      } catch (error) {
        console.error("Error fetching users:", error);
        set({ error: "Failed to fetch users" });
      } finally {
        set({ isLoading: false });
      }
    },

    getMessages: async (userId: string) => {
      try {
        set({ isLoading: true, error: null });
        const response = await apiClient.get(`/messages/${userId}`);
        set({ messages: response.data });
      } catch (error) {
        console.error("Error fetching messages:", error);
        set({ error: "Failed to fetch messages" });
      } finally {
        set({ isLoading: false });
      }
    },

    sendMessage: async (userId: string, text: string) => {
      try {
        const response = await apiClient.post(`/messages/send/${userId}`, {
          text,
        });
        const newMessage = response.data;

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      } catch (error) {
        console.error("Error sending message:", error);
        set({ error: "Failed to send message" });
      }
    },

    setSelectedUser: (user: UserType | null) => {
      set({ selectedUser: user });
    },

    addMessage: (message: MessageType) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    },

    clearMessages: () => {
      set({ messages: [] });
    },
  },
}));

export const useMessages = () => useMessageStore((state) => state.messages);
export const useUsers = () => useMessageStore((state) => state.users);
export const useMessageSelectedUser = () =>
  useMessageStore((state) => state.selectedUser);

export const useMessageIsLoading = () =>
  useMessageStore((state) => state.isLoading);
export const useMessageError = () => useMessageStore((state) => state.error);
export const useMessageActions = () =>
  useMessageStore((state) => state.actions);
