import { auth } from '@/services/firebase/firebase'; 

const UserData = () => {
  return (
    <div>
      <h1>{`Current user: ${auth.currentUser?.email}`}</h1>
      <h2>{`name: ${auth.currentUser?.displayName}`}</h2>
    </div>
  )
}

export default UserData