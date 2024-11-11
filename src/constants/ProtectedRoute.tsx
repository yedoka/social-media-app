import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useTypedSelector(
    (state) => state.profile.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
