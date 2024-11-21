import { userDetails } from '../types/userDetails';

interface ProfileDataProps {
  user: userDetails | undefined;
  onEdit: () => void;
}

const ProfileData = ({ user, onEdit }: ProfileDataProps) => {
  if (!user) return <div>Loading...</div>;

  return (
    <main>
      <img src={user.profileImg} alt={user.username} className="user-details__img" />
      <div className="user-details__data">
        <p className="user-details__data__username">{user.username}</p>
        <p className="user-details__data__name">{user.name}</p>
        <p className="user-details__data__surname">{user.surname}</p>
        <p className="user-details__data__email">{user.email}</p>
      </div>
      <button onClick={onEdit} className="user-details__edit-button">
        Edit
      </button>
    </main>
  );
};

export default ProfileData;
