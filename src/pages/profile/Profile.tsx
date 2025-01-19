import EditForm from '@/components/profile/EditForm';
import Button from '@/components/ui/button/Button';
import { fetchCurrentLoggedUser } from '@/services/api/user';
import { enable } from '@/store/slices/editProfile';
import { RootState } from '@/store/store';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)
  const dispatch = useDispatch();
  
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);
  const fetchUser = async() => {
    const currentUser = await fetchCurrentLoggedUser();
    setUser(currentUser)
  }
  const handleEditProfile = () => dispatch(enable());

  useEffect(() => {
    fetchUser();
  }, [])

  if (!user) {
    return;
  }

  return (
    isEditing ? (
      <EditForm />
    ) : (
      <div className="flex items-center gap-8 bg-accent-bg p-4 border border-dark-border rounded-md">
        <img
          src={user.profilePicture}
          alt={`${user.displayName}'s profile`}
          className="rounded-full w-32 h-32 object-cover"
        />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>
              {user.displayName}
            </span>
            <Button onClick={handleEditProfile} className="text-xs">Edit</Button>
          </div>
          <div className="flex gap-4 text-xs">
            <span>Followers: {user.followers.length}</span>
            <span>Following: {user.following.length}</span>
            <span>Posts: {user.posts.length}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
