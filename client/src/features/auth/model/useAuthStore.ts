import { create } from "zustand";
import apiClient from "@/services/api/apiClient";
import type { UserType } from "@/shared/types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

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
  actions: {
    checkAuth: () => Promise<void>;
    logIn: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logOut: () => Promise<void>;
  };
}

export const useAuthStore = create<AuthUserStore>((set) => ({
  isPending: false,
  authUser: null,
  isCheckingAuth: true,

  actions: {
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
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message, {
          theme: "dark",
          position: "top-center",
        });
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
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message, {
          theme: "dark",
          position: "top-center",
        });
      } finally {
        set({ isPending: false });
      }
    },
    logOut: async () => {
      try {
        await apiClient.post("/auth/logout");
        set({ authUser: null });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message, {
          theme: "dark",
          position: "top-center",
        });
      }
    },
  },
}));

export const useAuthUser = () => useAuthStore((state) => state.authUser);
export const useAuthIsCheckingAuth = () =>
  useAuthStore((state) => state.isCheckingAuth);
export const useAuthIsPending = () => useAuthStore((state) => state.isPending);

export const useAuthActions = () => useAuthStore((state) => state.actions);
