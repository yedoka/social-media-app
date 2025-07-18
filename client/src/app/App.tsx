import { Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "./AppProviders";

import "@/app/index.css";
import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { useEffect } from "react";
import { Auth, Feed, Profile } from "@/pages";
import { AuthLayout, RootLayout } from "@/layout";

export const App = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            path="/"
            element={authUser ? <Feed /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/user/:username"
            element={authUser ? <Profile /> : <Navigate to="/auth/login" />}
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="/auth/signup"
            element={!authUser ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/login"
            element={!authUser ? <Auth /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </AppProviders>
  );
};
