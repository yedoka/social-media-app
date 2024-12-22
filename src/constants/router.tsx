import React from 'react';
import RootLayout from "../layout/Root";
import AuthLayout from "../layout/Auth";
import SignInForm from "../pages/auth/SignIn";
import SignUpForm from "../pages/auth/SignUp";

import Feed from "@/pages/Feed";
import Profile from "@/pages/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import CreatePost from "@/pages/CreatePost";
import FindUser from "@/pages/FindUser";
import UserDetail from "@/pages/FoundUserDetail";

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
        path: "createPost",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "findUser",
        element: (
          <ProtectedRoute>
            <FindUser />
          </ProtectedRoute>
        )
      },
      {
        path: "findUser/:userId",
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
