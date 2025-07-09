import { Posts } from "@/features/profile/ui/ProfilePosts";
import { User } from "@/shared/types";
import { Avatar, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useToggleFollow } from "../api/useProfile";
import { useFollowStatus } from "@/shared/api/useFollowStatus";
import { checkIsOwnProfile } from "../lib/checkIsOwnProfile";

interface ProfileDetailsProps {
  userData: User;
  onEdit?: () => void;
}

export const ProfileDetails = ({ userData, onEdit }: ProfileDetailsProps) => {
  const isOwnProfile = checkIsOwnProfile(userData.displayName);
  const { data: isFollowing } = useFollowStatus(userData.displayName);
  const { mutateAsync: toggleFollow } = useToggleFollow(userData.displayName);

  return (
    <Stack w="full" align="center">
      <HStack gap={8} p={8}>
        <Avatar.Root size="2xl">
          <Avatar.Image src={userData.profilePicture} />
          <Avatar.Fallback name={userData.displayName} />
        </Avatar.Root>
        <Stack>
          <HStack justify="space-between">
            <Heading>{userData.displayName}</Heading>
            {isOwnProfile ? (
              <Button variant="subtle" onClick={onEdit}>
                Edit profile
              </Button>
            ) : (
              <Button onClick={() => toggleFollow(!isFollowing)}>
                {isFollowing ? "Unfollow" : "Follow"}
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
      <Posts user={userData} />
    </Stack>
  );
};
