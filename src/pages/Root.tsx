import { Link, Outlet } from "react-router-dom";
import "../styles/globals.scss";
import "../styles/root.scss";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>SoundShare</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/feed`}>Feed</Link>
            </li>
            <li>
              <Link to={`/profile`}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="main__content">
        <Outlet />
      </div>
    </>
  );
}
