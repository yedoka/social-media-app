import { useQuery } from "@tanstack/react-query";
import { checkFollowStatus } from "@/services/api/user";
import { auth } from "@/services/api/config";

export const useFollowStatus = (displayName: string) => {
  const currentUser = auth.currentUser;
  const isOwnProfile = currentUser?.displayName === displayName;

  return useQuery<boolean, Error>({
    queryKey: ["followStatus", displayName],
    queryFn: () => checkFollowStatus(displayName),
    enabled: !!displayName && !!currentUser && !isOwnProfile,
  });
};
