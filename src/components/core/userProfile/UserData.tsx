import { getCurrentUser } from "@/services/firebase/user"

const UserData = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <p>No user is currently logged in.</p>
  }

  return (
    <div>
      <h1>Current user: {currentUser.email}</h1>
      <h2>name: {currentUser.displayName}</h2>
    </div>
  )
}

export default UserData