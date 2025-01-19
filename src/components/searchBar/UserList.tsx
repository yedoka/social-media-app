import { User } from "@/types/user";
import { Link } from "react-router-dom";

const UserList: React.FC<{ foundUsers: User[] }> = ({ foundUsers }) => {
  if (foundUsers.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <>
      {foundUsers.slice(0, 3).map((item) => (
        <Link to={`/user/${item.displayName}`} key={item.id} className="flex items-center">
          <img src={item.profilePicture} alt="" className="w-8 h-8 object-cover mr-4 rounded-full" />
          <span style={{ color: "#fff" }}>{item.displayName}</span>
        </Link>
      ))}
    </>
  );
};

export default UserList;
