import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="/">Feed</Link>
          </li>
          <li>
            <Link to="/notifications">
              <li>Notifications</li>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
