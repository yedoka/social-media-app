import React from 'react';
import { auth } from "@/services/api/config"
import { fetchUserById } from "@/services/api/user"
import type { User } from "@/types/User"
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
      <p>Followers: {user?.followers.length}</p>
      <p>Following: {user?.following.length}</p>
      <p>Posts: {user?.posts.length}</p>
    </div>
  )
}

export default UserStats