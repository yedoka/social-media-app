import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button/Button";
import { logout } from "@/services/api/auth";
import FindUser from "@/components/findUser/FindUserInput";
import { Newspaper, User, Edit3 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logOut } from "@/store/slices/auth";

const SideBar = () => {
  const dispatch = useDispatch();
  const [, setCookie] = useCookies();

  const links = [
    {
      path: '/',
      description: 'Feed',
      icon: <Newspaper className="w-5 h-5 mr-2" />
    },
    {
      path: `/profile`,
      description: 'Profile',
      icon: <User className="w-5 h-5 mr-2" />
    },
    {
      path: '/createPost',
      description: 'Create Post',
      icon: <Edit3 className="w-5 h-5 mr-2" />
    },
  ];

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      setCookie('authToken', '', { path: '/' });
      dispatch(logOut())
      navigate('/auth/sign-in');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sticky top-0 left-0 h-screen w-64 p-4 border border-dark-border bg-accent-bg text-primary-text flex flex-col justify-between text-base">
      <div className="space-y-4 text-xs">
        <Link to="/" className="text-xl font-bold tracking-tight">LINK UP</Link>
        <nav>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.description}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-dark-border transition-colors duration-200 ${isActive ? 'bg-active-link font-bold text-white' : 'text-primary-text'}`
                  }
                >
                  {link.icon}
                  {link.description}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <FindUser />
      </div>
      <Button onClick={logoutHandler} className="mt-4">Log out</Button>
    </div>
  );
};

export default SideBar;