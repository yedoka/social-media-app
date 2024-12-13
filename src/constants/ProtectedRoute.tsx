import React, { FC } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
// import { RootState } from "../store/store";
// import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [cookie] = useCookies(['authToken'])
  const authToken = cookie.authToken;

  if (!authToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
