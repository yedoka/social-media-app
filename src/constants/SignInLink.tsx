import React from "react";
import { Link } from "react-router-dom";

interface ReusableLinkProps {
  children: React.ReactNode;
  className?: string;
}

const SignInLink: React.FC<ReusableLinkProps> = ({ children, className }) => {
  return (
    <Link to="/auth/sign-in" className={`text-xs underline mt-4 ${className || ""}`}>
      {children}
    </Link>
  );
};

export default SignInLink;
