import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import { logout } from "@/services/api/auth";
import "./Sidebar.scss";
import FindUser from "../findUser/FindUser";

const CoreSidebar = () => {

  const links = [
    {
      path: '/',
      description: 'Feed'
    },
    {
      path: '/profile',
      description: 'Profile'
    },
    {
      path: '/createPost',
      description: 'Create Post'
    },
  ]

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout()
      navigate('/auth/sign-in');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="sidebar">
      <h1>Social Media</h1>
      <nav>
        <ul>
          {links.map((link) => 
            <li key={link.description}>
              <Link to={link.path} className='sidebar__link'>{link.description}</Link>
            </li>
          )}
        </ul>
      </nav>
      <FindUser />
      <Button onClick={logoutHandler}>Log out</Button>
    </div>
  )
}

export default CoreSidebar