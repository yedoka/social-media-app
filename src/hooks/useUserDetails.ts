import { useEffect, useState } from "react";
import { fetchUser, followUser, isFollowingUser, unfollowUser } from "@/services/api/user";
import { auth } from "@/services/api/config"; 
import type { User } from "@/types/user";

export const useUserDetails = (userId: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAndSetUser = async () => {
    try {
      const fetchedUser = await fetchUser(userId);
      setUserData(fetchedUser);

      const isUserFollowing = await isFollowingUser(userId);
      setIsFollowing(isUserFollowing);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFollow = async () => {
    if (!auth.currentUser) {
      setError("You must be logged in to follow/unfollow users.");
      return;
    }

    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        
        await fetchAndSetUser();
      } else {
        await followUser(userId);
        setIsFollowing(true);
        
        await fetchAndSetUser();
      }
    } catch (err) {
      console.error("Error toggling follow state:", err);
      setError('Failed to update follow state. Please try again.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAndSetUser();
    }
  }, [userId]);

  return { userData, isFollowing, error, loading, toggleFollow };
};
