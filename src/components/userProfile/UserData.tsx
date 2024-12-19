import { getCurrentUser } from "@/services/api/user"

const UserData = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <p>No user is currently logged in.</p>
  }

  return (
    <div>
      <h1>Current user: {currentUser.email}</h1>
      <h2>name: {currentUser.displayName}</h2>
      <img src={currentUser.photoURL} alt="avatar" />
    </div>
  )
}

export default UserData