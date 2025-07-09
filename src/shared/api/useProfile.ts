import { fetchCurrentLoggedUser } from "@/services/api/user";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentLoggedUser,
  });
};
