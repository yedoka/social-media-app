import { create } from "zustand";
import type { UserType } from "@/shared/types";

interface MessageClientStore {
  selectedUser: UserType | null;
  isTyping: boolean;
  typingUsers: string[];

  setSelectedUser: (user: UserType | null) => void;
  setIsTyping: (isTyping: boolean) => void;
  addTypingUser: (userId: string) => void;
  removeTypingUser: (userId: string) => void;
  clearTypingUsers: () => void;
}

export const useMessageClientStore = create<MessageClientStore>((set, get) => ({
  selectedUser: null,
  isTyping: false,
  typingUsers: [],

  setSelectedUser: (user) => set({ selectedUser: user }),
  setIsTyping: (isTyping) => set({ isTyping }),
  addTypingUser: (userId) =>
    set((state) => ({
      typingUsers: state.typingUsers.includes(userId)
        ? state.typingUsers
        : [...state.typingUsers, userId],
    })),
  removeTypingUser: (userId) =>
    set((state) => ({
      typingUsers: state.typingUsers.filter((id) => id !== userId),
    })),
  clearTypingUsers: () => set({ typingUsers: [] }),
}));
