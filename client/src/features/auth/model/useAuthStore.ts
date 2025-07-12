import apiClient from "@/services/api/apiClient";
import type { UserType } from "@/shared/types";
import { create } from "zustand";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthUserStore {
  authUser: UserType | null;
  isCheckingAuth: boolean;
  isPending: boolean;
  checkAuth: () => Promise<void>;
  logIn: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthUserStore>((set) => ({
  isPending: false,
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await apiClient.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logIn: async (data) => {
    try {
      set({ isPending: true });
      const res = await apiClient.post("/auth/login", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    } finally {
      set({ isPending: false });
    }
  },
  register: async (data) => {
    try {
      set({ isPending: true });
      const res = await apiClient.post("/auth/register", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    } finally {
      set({ isPending: false });
    }
  },
  logOut: async () => {
    try {
      await apiClient.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
}));
