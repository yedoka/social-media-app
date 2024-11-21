import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateProfile } from '../store/slices/profileSlice';
import ProfileForm from './ProfileForm';
import ProfileData from './ProfileData';
import './UserProfile.scss';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.profile.userDetails);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (formData: NonNullable<typeof user>) => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details">
      {isEditing ? (
        <ProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileData user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UserProfile;
