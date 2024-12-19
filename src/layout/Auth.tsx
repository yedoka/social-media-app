import { Outlet } from "react-router-dom";
import signInBg from "@/assets/signIn-bg.jpg"
import '@/layout/Auth.scss';

const AuthLayout = () => {
  return (
    <div className="formLayout">
      <img src={signInBg} alt="signIn-background" />
      <main className="formLayout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout