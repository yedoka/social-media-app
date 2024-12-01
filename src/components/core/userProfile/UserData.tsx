import { auth } from '../../../services/firebase'; 

const UserData = () => {
  return (
    <div>
      {`Current user: ${auth.currentUser?.email}`}
      {`name: ${auth.currentUser?.displayName}`}
    </div>
  )
}

export default UserData