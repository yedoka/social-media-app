import { Outlet } from "react-router-dom";
import { Sidebar } from "@/shared/ui/Sidebar";
import { Toaster } from "@/shared/ui/toaster";
import { Box, Flex } from "@chakra-ui/react";

export const RootLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box w="full">
        <Outlet />
        <Toaster />
      </Box>
    </Flex>
  );
};
