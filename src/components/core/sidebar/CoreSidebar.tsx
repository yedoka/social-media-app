import { Link } from "react-router-dom";
import "./CoreSidebar.scss";

const CoreSidebar = () => {
  return (
    <div className="coreSidebar">
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
  )
}

export default CoreSidebar