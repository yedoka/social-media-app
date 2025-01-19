import { useEffect, useState } from "react";
import { fetchUserByUsernameFunc, followUser, checkFollowStatus, unfollowUser} from "@/services/api/user";
import { auth } from "@/services/api/config"; 
import type { User } from "@/types/user";

export const useUserDetails = (displayName: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAndSetUser = async () => {
    try {
      setError(null);

      const fetchedUser = await fetchUserByUsernameFunc(displayName);

      if (!fetchedUser) {
        setError("User not found");
        setUserData(null);
        return;
      }

      setUserData(fetchedUser);

      if (auth.currentUser) {
        const isUserFollowing = await checkFollowStatus(displayName);
        setIsFollowing(isUserFollowing);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
      setUserData(null)
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
        await unfollowUser(displayName);
        setIsFollowing(false);
        
        await fetchAndSetUser();
      } else {
        await followUser(displayName);
        setIsFollowing(true);
        
        await fetchAndSetUser();
      }
    } catch (err) {
      console.error("Error toggling follow state:", err);
      setError('Failed to update follow state. Please try again.');
    }
  };

  useEffect(() => {
    if (displayName) {
      fetchAndSetUser();
    }
  }, [displayName]);

  return { userData, isFollowing, error, loading, toggleFollow };
};
