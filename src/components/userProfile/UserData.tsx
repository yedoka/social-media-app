import React from 'react';
import { auth } from "@/services/api/config";
import { fetchUserById } from "@/services/api/user"
import type { User } from "@/types/User";
import { useEffect, useState } from "react";

const UserData = () => {
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
      <h1>Current user: {user?.email}</h1>
      <h2>name: {user?.displayName}</h2>
      <img src={user?.profilePicture} alt="avatar" />
    </div>
  )
}

export default UserData