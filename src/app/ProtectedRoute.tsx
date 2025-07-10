import type { ReactNode, ReactElement } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [cookies] = useCookies(["authToken"]);
  const authToken = cookies.authToken;

  if (!authToken) {
    return <Navigate to="/auth" replace />;
  }

  return children as ReactElement;
};
