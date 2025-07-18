import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const AuthLayout = () => {
  return (
    <Container>
      <Outlet />
      <ToastContainer />
    </Container>
  );
};
