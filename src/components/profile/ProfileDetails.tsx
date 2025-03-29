import Posts from '@/components/profile/Posts';
import Button from '@/components/ui/button/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDispatch } from 'react-redux';
import { enable } from '@/store/slices/editProfile';
import { useNavigate } from 'react-router';
import { User } from '@/types/user';
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ErrorMessage from "@/components/ui/spinner/ErrorMessage";

interface ProfileDetailsProps {
  data: User | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ data, isLoading, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditProfile = () => dispatch(enable());

  if (error) {
    navigate("/auth/sign-in");
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <ErrorMessage message="Could not fetch current user data." />;
  }

  return (
    <div>
      <div className="flex items-center justify-center w-[768px] gap-8 bg-accent-bg p-4 mb-8 border border-dark-border rounded-md">
        <Avatar className="w-32 h-32">
          <AvatarImage src={data.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>{data.displayName}</span>
            <Button onClick={handleEditProfile} className="text-xs">Edit profile</Button>
          </div>
          <div className="flex gap-4 text-xs">
            <span>Followers: {data.followers.length}</span>
            <span>Following: {data.following.length}</span>
            <span>Posts: {data.posts.length}</span>
          </div>
        </div>
      </div>
      <Posts user={data} />
    </div>
  );
};

export default ProfileDetails;