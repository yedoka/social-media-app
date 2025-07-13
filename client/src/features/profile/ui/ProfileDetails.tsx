import { Avatar, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";

import { ProfilePosts } from "@/features/profile/ui/ProfilePosts";
import type { UserType } from "@/shared/types";
import { useUserStore } from "../model/useUserStore";

interface ProfileDetailsProps {
  userData: UserType;
  onEdit?: () => void;
}

export const ProfileDetails = ({ userData, onEdit }: ProfileDetailsProps) => {
  const { currentUserProfile, visitedUserProfile, followUser, unfollowUser } =
    useUserStore();

  const isOwnProfile = currentUserProfile?._id === userData._id;

  const isFollowing = () => {
    if (!visitedUserProfile || !currentUserProfile) return false;
    return visitedUserProfile?.followers.length > 0;
  };

  const toggleFollow = async () => {
    if (!userData) return;

    if (isFollowing()) {
      await unfollowUser(userData._id);
    } else {
      await followUser(userData._id);
    }
  };

  return (
    <Stack w="full" align="center">
      <HStack gap={8} p={8}>
        <Avatar.Root size="2xl">
          <Avatar.Image src={userData.avatar} />
          <Avatar.Fallback name={userData.name} />
        </Avatar.Root>
        <Stack>
          <HStack justify="space-between">
            <Heading>{userData.name}</Heading>
            {isOwnProfile ? (
              <Button variant="subtle" onClick={onEdit}>
                Edit profile
              </Button>
            ) : (
              <Button onClick={() => toggleFollow()}>
                {isFollowing() ? "Unfollow" : "Follow"}
              </Button>
            )}
          </HStack>
          <HStack fontSize="sm">
            <Text>Posts: {userData.posts.length}</Text>
            <Text>Followers: {userData.followers.length}</Text>
            <Text>Following: {userData.following.length}</Text>
          </HStack>
        </Stack>
      </HStack>
      <ProfilePosts user={userData} />
    </Stack>
  );
};
