import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./authApi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useAuthQuery = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.checkAuth,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Login failed", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Registration failed", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.clear();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Logout failed", {
        theme: "dark",
        position: "top-center",
      });
    },
  });
};
