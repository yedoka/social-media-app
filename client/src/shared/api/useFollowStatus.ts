import { useQuery } from "@tanstack/react-query";
import { checkFollowStatus } from "@/services/api/user";

export const useFollowStatus = (displayName: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["followStatus", displayName],
    queryFn: () => checkFollowStatus(displayName),
    enabled: !!displayName,
  });
};
