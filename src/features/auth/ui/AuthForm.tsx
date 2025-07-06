import { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

export const AuthForm = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <>
      {isLogin ? <Login /> : <SignUp />}
      <Box mt={6} textAlign="center">
        <Flex justify="center" gap={2}>
          <Text fontSize="sm" color="gray.500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Text
            onClick={() => setLogin(!isLogin)}
            color="blue.500"
            cursor="pointer"
            fontSize="sm"
            fontWeight="500"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Text>
        </Flex>
        <ToastContainer />
      </Box>
    </>
  );
};
