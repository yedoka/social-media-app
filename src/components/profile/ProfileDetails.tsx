import { useEffect, useState } from "react";
import { fetchCurrentLoggedUser } from "@/services/api/user";
import type { User } from "@/types/user";

const Details = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchCurrentUser = async () => {
    try {
      const fetchedUser = await fetchCurrentLoggedUser();
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        console.error("Fetched user is null");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Current user: {user.email}</h1>
      <h2>Name: {user.displayName}</h2>
      <img src={user.profilePicture} alt="avatar" />
    </div>
  );
};

export default Details;
