import { fetchCurrentLoggedUser } from "@/services/api/user"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentLoggedUser,
  })
}