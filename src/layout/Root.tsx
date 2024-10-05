import { Outlet } from "react-router-dom";
import "./Root.scss";
import CoreSidebar from '../components/core/sidebar/CoreSidebar';

export default function Root() {
  return (
    <div className="rootLayout">
      <CoreSidebar />
      <div className="rootLayout__content">
        <Outlet />
      </div>
    </div>
  );
}
