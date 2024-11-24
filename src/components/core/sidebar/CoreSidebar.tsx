import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import Button from "../Button";
import "./CoreSidebar.scss";

const CoreSidebar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="sidebar">
      <h1>Social Media</h1>
      <nav>
        <ul>
          <li>
            <Link to={`/`} className="sidebar__link">Feed</Link>
          </li>
          <li>
            <Link to={`/profile`} className="sidebar__link">Profile</Link>
          </li>
        </ul>
      </nav>
      <Button onClick={logout}>Log out</Button>
    </div>
  )
}

export default CoreSidebar