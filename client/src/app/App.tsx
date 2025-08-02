import { Navigate, Route, Routes } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { useAuth } from "@/features/auth";
import { Auth, Feed, Profile, Messages } from "@/pages";
import { AuthLayout, RootLayout } from "@/layout";
import "@/app/index.css";

export const App = () => {
  const { user: authUser, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <Center h="100vh" w="full">
        <Spinner size="md" />
      </Center>
    );
  }

  return (
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
        <Route
          path="/messages"
          element={authUser ? <Messages /> : <Navigate to="/auth/login" />}
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
  );
};
