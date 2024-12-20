import { auth } from "@/services/api/config"
import { fetchUserById } from "@/services/api/user"
import { User } from "@/types/User"
import { useEffect, useState } from "react"

const UserStats = () => {
  const [user, setUser] = useState<User | null>(null)
  if (!auth.currentUser) return;
  const currentUserId = auth.currentUser.uid;

  const fetchCurrentUser = async () => {
    const fetchedUser = await fetchUserById(currentUserId);
    setUser(fetchedUser)
  }

  useEffect(() => {
    fetchCurrentUser();
  }, [])

  return (
    <div>
      <h1>User stats</h1>
      <p>Followers: <span>{user?.followers.length}</span></p>
      <p>Following: <span>{user?.following.length}</span></p>
      <p>Posts: <span>12</span></p>
    </div>
  )
}

export default UserStats