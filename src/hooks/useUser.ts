import { useQuery } from "@tanstack/react-query";
import { fetchUserByUsername } from "@/services/api/user";

export const useUser = (displayName: string) => {
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["user", displayName],
    queryFn: () => fetchUserByUsername(displayName),
    enabled: !!displayName,
  });

  return {
    userData,
    error: error?.message || null,
    isLoading: isLoading,
  };
};