import EditForm from '@/components/profile/EditForm';
import Posts from '@/components/profile/Posts';
import Button from '@/components/ui/button/Button';
import { fetchCurrentLoggedUser } from '@/services/api/user';
import { enable } from '@/store/slices/editProfile';
import { RootState } from '@/store/store';
import { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);

  const fetchUser = async() => {
    try {
      setLoading(true);
      const currentUser = await fetchCurrentLoggedUser();
      
      if(currentUser) {
        setUser(currentUser)
      } else {
        navigate('/auth/sign-in')
      }
    } catch (err) {
      console.error(err);
      navigate('/auth/sign-in')
    } finally {
      setLoading(false);
    }
  }
  const handleEditProfile = () => dispatch(enable());

  useEffect(() => {    
    fetchUser();
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      {
        isEditing ? (
          <EditForm />
        ) : (
          <div className="flex items-center justify-center w-[768px] gap-8 bg-accent-bg p-4 mb-8 border border-dark-border rounded-md">
            <Avatar className='w-32 h-32'>
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
      }
      <Posts user={user} />
    </>
  );
};

export default Profile;
