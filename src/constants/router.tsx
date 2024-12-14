import RootLayout from "../layout/Root";
import AuthLayout from "../layout/AuthLayout";
import SignInForm from "../pages/auth/SignIn";
import SignUpForm from "../pages/auth/SignUp";

import Feed from "@/pages/root/Feed";
import Profile from "@/pages/root/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import CreatePost from "@/pages/root/CreatePost";
import FindUser from "@/pages/root/FindUser";
import UserDetail from "@/pages/root/UserDetail";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "createpost",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "finduser",
        element: (
          <ProtectedRoute>
            <FindUser />
          </ProtectedRoute>
        )
      },
      {
        path: "finduser/:userId",
        element: (
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        )
      }
    ],
  },
  {
    path: "/sign-in",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <SignInForm />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <SignUpForm />,
      },
    ],
  },
];
