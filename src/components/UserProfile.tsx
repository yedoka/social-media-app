import { auth } from '../services/firebase'; 

const UserProfile: React.FC = () => {

  if (auth) {
    return <div>Signed in as: {auth?.currentUser?.email}</div>;
  } else {
    return <div>No user is signed in.</div>;
  }
};

export default UserProfile;
