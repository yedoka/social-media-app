import { Outlet } from "react-router-dom";
import { Sidebar } from "@/shared/ui/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

export const RootLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box w="full">
        <Outlet />
        <ToastContainer />
      </Box>
    </Flex>
  );
};
