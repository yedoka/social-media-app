import apiClient from "@/services/api/apiClient";
import type { UserType } from "@/shared/types";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  checkAuth: async (): Promise<UserType> => {
    const response = await apiClient.get("/auth/check");
    return response.data;
  },

  login: async (data: LoginData): Promise<UserType> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<UserType> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
