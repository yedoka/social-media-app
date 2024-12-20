import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { enable } from '@/store/slices/editProfile';
import UserData from './UserData';
import EditForm from './EditForm';
import Button from '../Button';

const UserProfile: React.FC = () => {
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);
  const dispatch = useDispatch();

  const handleEditProfile = () => dispatch(enable());

  return isEditing ? (
    <EditForm />
  ) : (
    <div>
      <UserData />
      <Button onClick={handleEditProfile}>Edit</Button>
    </div>
  );
};

export default UserProfile;
