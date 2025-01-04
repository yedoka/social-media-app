import React from 'react';
import { Outlet } from "react-router-dom";
import CoreSidebar from '@/components/core/sidebar/Sidebar';
import "./Root.scss";

export default function RootLayout() {
  return (
    <div className="rootLayout">
      <CoreSidebar />
      <div className="rootLayout__content">
        <Outlet />
      </div>
    </div>
  );
}
