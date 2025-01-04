import { User } from "@/types/user";
import { Link } from "react-router-dom";

const Results: React.FC<{ foundUsers: User[] }> = ({ foundUsers }) => {
  if (foundUsers.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      {foundUsers.slice(0, 3).map((item) => (
        <Link to={`/findUser/${item.id}`} key={item.id}>
          <img src={item.profilePicture} alt="" style={{ width: "16px" }} />
          <span style={{ color: "#fff" }}>{item.displayName}</span>
        </Link>
      ))}
    </div>
  );
};

export default Results;
