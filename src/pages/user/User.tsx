import { useParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/ui/button/Button";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ErrorMessage from "@/components/ui/spinner/ErrorMessage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Posts from "@/components/profile/Posts";

const User = () => {
  const { displayName } = useParams<{ displayName: string }>();
  const searchTerm = displayName || '';

  const { userData, isFollowing, error, isLoading, toggleFollow } = useUser(searchTerm);

  if (!displayName) {
    return <ErrorMessage message="Invalid user." />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!userData) {
    return <ErrorMessage message="User not found." />;
  }

  return (
    <div>
      <div className="flex items-center justify-center w-[768px] gap-8 bg-accent-bg p-4 mb-8 border border-dark-border rounded-md">
        <Avatar className="w-32 h-32">
          <AvatarImage src={userData.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>{userData.displayName}</span>
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
      <Posts user={userData} />
    </div>
  );
};

export default User;