import UserData from './UserData';
import EditForm from './EditForm';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { enable } from '../../../store/slices/editProfile';

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
