import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex w-full h-screen bg-gradient-to-r from-blue-600 to-violet-600 text-primary-text">
      <main className="flex w-full h-screen justify-center items-center">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout