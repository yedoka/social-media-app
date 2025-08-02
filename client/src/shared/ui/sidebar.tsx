import { Link, NavLink, useNavigate } from "react-router-dom";
import { Newspaper, User, LogOutIcon, MessageCircle } from "lucide-react";
import { Box, Button, HStack, Icon, List, Stack, Text } from "@chakra-ui/react";
import { SearchBar } from "@/features/search-bar/ui/SearchBar";
import { CreatePost } from "@/features/posts/ui/CreatePost";
import { useAuthActions } from "@/features/auth/model";

export const Sidebar = () => {
  const links = [
    {
      path: "/",
      description: "Feed",
      icon: <Newspaper />,
    },
    {
      path: `/profile`,
      description: "Profile",
      icon: <User />,
    },
    {
      path: `/messages`,
      description: "Messages",
      icon: <MessageCircle />,
    },
  ];
  const navigate = useNavigate();
  const { logout } = useAuthActions();
  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box
      as="nav"
      w="284px"
      height="100vh"
      position="sticky"
      top="0"
      left="0"
      p={2}
      boxShadow="md"
    >
      <Stack gap={8} height="full" justifyContent="space-between">
        <Stack gap={6}>
          <Link to="/">
            <Text fontSize="2xl" fontWeight="bold">
              social
            </Text>
          </Link>
          <List.Root variant="plain">
            {links.map((link) => (
              <List.Item key={link.path} mb={1}>
                <NavLink to={link.path} className="w-full">
                  {({ isActive }) => (
                    <HStack
                      align="center"
                      gap={2}
                      px={3}
                      py={2}
                      borderRadius="md"
                      _hover={{ bg: "gray.900" }}
                      bg={isActive ? "gray.900" : "transparent"}
                    >
                      <Icon size="sm">{link.icon}</Icon>
                      <Text fontSize="sm">{link.description}</Text>
                    </HStack>
                  )}
                </NavLink>
              </List.Item>
            ))}
            <CreatePost />
          </List.Root>
          <SearchBar />
        </Stack>
        <Button onClick={logoutHandler} variant="surface">
          <LogOutIcon />
          Log out
        </Button>
      </Stack>
    </Box>
  );
};
