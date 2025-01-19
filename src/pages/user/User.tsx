import { useParams } from "react-router-dom";
import { useUserDetails } from "@/hooks/useUserDetails";
import Button from "@/components/ui/button/Button";

const User = () => {
  const { displayName } = useParams<{ displayName: string }>();
  const searchTerm = displayName || '';

  const { userData, isFollowing, error, loading, toggleFollow } = useUserDetails(searchTerm);

  if (!displayName) {
    console.log(displayName);
    
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
    <div className="flex items-center gap-8 bg-accent-bg p-4 border border-dark-border rounded-md">
      <img
        src={userData.profilePicture}
        alt={`${userData.displayName}'s profile`}
        className="rounded-full w-32 h-32 object-cover"
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span>
            {userData.displayName}
          </span>
          <Button onClick={toggleFollow} className="text-xs">
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <div className="flex gap-4 text-xs">
          <span>Followers: {userData.followers.length}</span>
          <span>Following: {userData.following.length}</span>
          <span>Posts: {userData.posts.length}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
