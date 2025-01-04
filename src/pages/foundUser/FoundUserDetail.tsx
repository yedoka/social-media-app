import React from "react";
import { useParams } from "react-router-dom";
import { useUserDetails } from "@/hooks/useUserDetails";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const safeUserId = userId || '';
  const { userData, isFollowing, error, loading, toggleFollow } = useUserDetails(safeUserId);

  if (!userId) {
    return <div>Invalid user.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Username:</strong> {userData.displayName}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <img
        src={userData.profilePicture}
        alt={`${userData.displayName}'s profile`}
      />
      <p>Followers: {userData.followers.length}</p>
      <p>Following: {userData.following.length}</p>
      <p>Posts: {userData.posts.length}</p>
      <button onClick={toggleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserDetail;
