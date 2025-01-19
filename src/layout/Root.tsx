import { Outlet } from "react-router-dom";
import SideBar from '@/components/core/sidebar/Sidebar';
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout() {
  
  return (
    <div className="flex text-primary-text h-full">
      <SideBar />
      <div className="p-4 mx-auto min-h-screen h-full bg-dark-bg">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
