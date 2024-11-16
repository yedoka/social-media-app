import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
