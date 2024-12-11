import RootLayout from "../layout/Root";
import AuthLayout from "../layout/AuthLayout";
import SignInForm from "../pages/auth/SignIn";
import SignUpForm from "../pages/auth/SignUp";

import Feed from "../pages/root/Feed";
import Profile from "../pages/root/Profile";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "../pages/root/CreatePost";

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
