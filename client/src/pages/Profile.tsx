import { Text, Spinner, Center } from "@chakra-ui/react";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { useCurrentProfile, useUserProfile } from "@/features/profile";
import { useParams } from "react-router";

export const Profile = () => {
  const { username } = useParams();

  const currentProfileQuery = useCurrentProfile();
  const userProfileQuery = useUserProfile(username || "");

  const profileData = username ? userProfileQuery : currentProfileQuery;
  const { profile, isLoading, isError, error } = profileData;

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="md" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Text>Failed to load user data: {error?.message || "Unknown error"}</Text>
    );
  }

  if (!profile) {
    return <Text>No user found</Text>;
  }

  return <ProfileDetails userData={profile} />;
};
