import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
