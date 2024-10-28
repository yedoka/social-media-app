import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ): (
        <section className="form__section">
          <Outlet />
        </section> 
      )}
    </>
  )
}

export default AuthLayout