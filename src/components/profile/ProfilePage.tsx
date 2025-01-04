import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { enable } from '@/store/slices/editProfile';
import Details from './ProfileDetails';
import EditForm from './ProfileEditForm';
import Button from '../ui/button/Button';

const ProfilePage: React.FC = () => {
  
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);
  const dispatch = useDispatch();

  const handleEditProfile = () => dispatch(enable());

  return isEditing ? (
    <EditForm />
  ) : (
    <div>
      <Details />
      <Button onClick={handleEditProfile}>Edit</Button>
    </div>
  );
};

export default ProfilePage;
