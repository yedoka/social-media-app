import { RootLayout } from "../layout/Root";

import { Feed } from "@/pages/feed/Feed";
import { Profile } from "@/pages/profile/Profile";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { User } from "@/pages/user/User";
import { Auth } from "@/pages/auth/Auth";

const protectedRoutes = [
  {
    path: "",
    element: <Feed />,
  },
  {
    path: "user/:displayName",
    element: <User />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
].map((route) => ({
  ...route,
  element: <ProtectedRoute>{route.element}</ProtectedRoute>,
}));

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [...protectedRoutes],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
];
