import { useParams } from "react-router-dom";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { Text } from "@chakra-ui/react";

export const User = () => {
  const { displayName } = useParams<"displayName">();
  if (!displayName) throw new Error("Missing displayname");

  const data = null;
  const isLoading = false;
  const error = null;

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error occurred from user</Text>;
  if (!data) return <Text>User not found</Text>;

  return <ProfileDetails userData={data} />;
};
