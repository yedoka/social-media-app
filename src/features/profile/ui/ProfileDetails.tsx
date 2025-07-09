import { Posts } from "@/features/profile/ui/ProfilePosts";
import { User } from "@/shared/types";
import { Avatar, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useFollow } from "@/hooks/useFollow";

interface ProfileDetailsProps {
  data: User;
  onEdit?: () => void;
}

export const ProfileDetails = ({ data, onEdit }: ProfileDetailsProps) => {
  const { isOwnProfile, isFollowing, toggleFollow } = useFollow(
    data.displayName
  );

  return (
    <Stack w="full" align="center">
      <HStack gap={8} p={8}>
        <Avatar.Root size="2xl">
          <Avatar.Image src={data.profilePicture} />
          <Avatar.Fallback name={data.displayName} />
        </Avatar.Root>
        <Stack>
          <HStack justify="space-between">
            <Heading>{data.displayName}</Heading>
            {isOwnProfile ? (
              <Button variant="subtle" onClick={onEdit}>
                Edit profile
              </Button>
            ) : (
              <Button onClick={toggleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </HStack>
          <HStack fontSize="sm">
            <Text>Posts: {data.posts.length}</Text>
            <Text>Followers: {data.followers.length}</Text>
            <Text>Following: {data.following.length}</Text>
          </HStack>
        </Stack>
      </HStack>
      <Posts user={data} />
    </Stack>
  );
};
