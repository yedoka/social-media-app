import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/Store';
import { enable } from '@/store/slices/EditProfile';
import UserData from './UserData';
import EditForm from './EditForm';
import Button from '../Button';

const UserProfile: React.FC = () => {
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    dispatch(enable());
  }

  if (!isEditing) {
    return <div>
      <UserData />
      <Button onClick={handleEditProfile}>Edit</Button>
    </div>
  } else {
    return <EditForm />
  }
  
};

export default UserProfile;
