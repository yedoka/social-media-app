import React, { FC } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

  const [cookies] = useCookies(['authToken'])
  const authToken = cookies.authToken;

  if (!authToken) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
