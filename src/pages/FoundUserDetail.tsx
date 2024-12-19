import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "@/types/Post";
import { fetchUserById } from "@/services/api/user";

const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();

  const fetchUser = async () => {
    if (!userId) return;

    try {
      const fetchedUsers = await fetchUserById(userId);
      setUser(fetchedUsers);
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
    </div>
  );
};

export default UserDetail;
