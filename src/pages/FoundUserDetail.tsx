import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "@/types/User";
import { fetchUserById, follow, unfollow } from "@/services/api/user";

const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();

  if (!userId) return;
  
  const fetchUser = async () => {
    try {
      const fetchedUser = await fetchUserById(userId);
      setUser(fetchedUser);
    } catch(err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]); 

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Username:</strong> {user.displayName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <img
        src={user.profilePicture}
        alt={`${user.displayName}'s profile`}
      />
      <p>Followers: {user.followers.length}</p>
      <p>Following: {user.following.length}</p>
      <p>Posts: {user.posts.length}</p>

      <button onClick={() => {follow(userId)}}>follow</button>
      <button onClick={() => {unfollow(userId)}}>unfollow</button>
    </div>
  );
};

export default UserDetail;
