import {
  useAuthQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from "../api/authQueries";

export const useAuth = () => {
  const { data: user, isLoading: isCheckingAuth, error } = useAuthQuery();

  return {
    user,
    isCheckingAuth,
    isAuthenticated: !!user,
    error,
  };
};

export const useAuthActions = () => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isPending:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
  };
};

export const useAuthUser = () => {
  const { data: user } = useAuthQuery();
  return user;
};

export const useIsAuthenticated = () => {
  const { data: user } = useAuthQuery();
  return !!user;
};

export const useIsCheckingAuth = () => {
  const { isLoading } = useAuthQuery();
  return isLoading;
};
