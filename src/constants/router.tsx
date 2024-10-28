import Root from "../layout/Root";
import AuthLayout from "../pages/auth/AuthLayout";
import SignInForm from "../pages/auth/forms/SignInForm"
import SignUpForm from "../pages/auth/forms/SignUpForm"

import Feed from "../pages/root/Feed";
import Profile from "../pages/root/Profile";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile />,
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
]