import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import { Sidebar } from "@/shared/ui/sidebar";

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
