import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { logout } from "@/services/api/auth";
import "./CoreSidebar.scss";

const CoreSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout()
      navigate('/sign-in');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="sidebar">
      <h1>Social Media</h1>
      <nav>
        <ul>
          <li>
            <Link to={`/`} className="sidebar__link">Feed</Link>
          </li>
          <li>
            <Link to={`/profile`} className="sidebar__link">Profile</Link>
          </li>
          <li>
            <Link to={`/createPost`} className="sidebar__link">Create Post</Link>
          </li>
          <li>
            <Link to={`/findUser`} className="sidebar__link">Find User</Link>
          </li>
        </ul>
      </nav>
      <Button onClick={logoutHandler}>Log out</Button>
    </div>
  )
}

export default CoreSidebar