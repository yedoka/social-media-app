import { useQuery } from "@tanstack/react-query";
import { fetchUserByUsername } from "@/services/api/user";

export const useUser = (displayName: string) => {
  return useQuery({
    queryKey: ["user", displayName],
    queryFn: () => fetchUserByUsername(displayName),
    enabled: !!displayName,
  });
};
