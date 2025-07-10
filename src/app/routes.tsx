import { RootLayout } from "@/layout/Root";
import { ProtectedRoute } from "@/app/ProtectedRoute";

import { Feed, User, Profile, Auth } from "@/pages";
import { AuthLayout } from "@/layout";

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
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
];
