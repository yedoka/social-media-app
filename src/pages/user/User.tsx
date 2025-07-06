import { useParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { Text } from "@chakra-ui/react";

export const User = () => {
  const { displayName } = useParams<"displayName">();
  if (!displayName) throw new Error("Missing displayname");

  const { userData, error, isLoading } = useUser(displayName);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error occurred from user</Text>;
  if (!userData) return <Text>User not found</Text>;

  return <ProfileDetails data={userData} />;
};
