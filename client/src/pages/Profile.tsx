import { useEffect } from "react";
import { Text, Spinner, Center } from "@chakra-ui/react";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { useUserStore } from "@/features/profile/model/useUserStore";
import { useParams } from "react-router";

export const Profile = () => {
  const { username } = useParams();

  const currentUserProfile = useUserStore((state) => state.currentUserProfile);
  const visitedUserProfile = useUserStore((state) => state.visitedUserProfile);
  const isLoadingProfile = useUserStore((state) => state.isLoadingProfile);
  const error = useUserStore((state) => state.error);
  const getCurrentUserProfile = useUserStore(
    (state) => state.getCurrentUserProfile
  );
  const getUserProfile = useUserStore((state) => state.getUserProfile);

  const profileToShow = username ? visitedUserProfile : currentUserProfile;

  useEffect(() => {
    if (username) {
      getUserProfile(username);
    } else {
      if (!currentUserProfile) {
        getCurrentUserProfile();
      }
    }
  }, [username]);

  if (isLoadingProfile) {
    return (
      <Center h="200px">
        <Spinner size="md" />
      </Center>
    );
  }

  if (error) return <Text>Failed to load user data: {error}</Text>;
  if (!profileToShow) return <Text>No user found</Text>;

  return <ProfileDetails userData={profileToShow} />;
};
