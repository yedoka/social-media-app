import { useEffect, useState } from "react"
import { auth } from "@/services/api/config"
import { fetchCurrentLoggedUser } from "@/services/api/user"
import type { User } from "@/types/user"

const ProfileStats = () => {
  const [user, setUser] = useState<User | null>(null)
  
  const fetchCurrentUser = async () => {
    if (auth.currentUser) {
      const fetchedUser = await fetchCurrentLoggedUser();
      setUser(fetchedUser)
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, [])

  return (
    <div>
      <h1>User stats</h1>
      <p>Followers: {user?.followers.length}</p>
      <p>Following: {user?.following.length}</p>
      <p>Posts: {user?.posts.length}</p>
    </div>
  )
}

export default ProfileStats