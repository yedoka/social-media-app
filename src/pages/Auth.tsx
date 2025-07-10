import { AuthForm } from "@/features/auth/ui";
import { Box, Center } from "@chakra-ui/react";

export const Auth = () => {
  return (
    <Center height="100vh" p={4}>
      <Box
        maxWidth="md"
        width="full"
        p={8}
        border="1px solid"
        borderColor="gray.900"
        rounded="md"
      >
        <AuthForm />
      </Box>
    </Center>
  );
};
