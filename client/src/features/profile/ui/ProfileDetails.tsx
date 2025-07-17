import { Avatar, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";

import { ProfilePosts } from "@/features/profile/ui/ProfilePosts";
import type { UserType } from "@/shared/types";

import { useUserStore } from "../model/useUserStore";
import { ProfileEditDialog } from "./ProfileEditDialog";
import { ProfileUserListDialog } from "./ProfileUserListDialog";

interface ProfileDetailsProps {
  userData: UserType;
}

export const ProfileDetails = ({ userData }: ProfileDetailsProps) => {
  const currentUserProfile = useUserStore((state) => state.currentUserProfile);
  const followUser = useUserStore((state) => state.followUser);
  const unfollowUser = useUserStore((state) => state.unfollowUser);

  const isOwnProfile = currentUserProfile?._id === userData._id;

  const isFollowing =
    currentUserProfile?.following?.some(
      (followedUser) => followedUser._id === userData._id
    ) || false;

  const toggleFollow = async () => {
    if (!userData || !currentUserProfile) return;

    if (isFollowing) {
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
              <ProfileEditDialog
                data={userData}
                trigger={
                  <Button variant="outline" size="sm">
                    Edit profile
                  </Button>
                }
              />
            ) : (
              <Button
                onClick={() => toggleFollow()}
                variant={isFollowing ? "subtle" : "solid"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </HStack>
          <HStack fontSize="sm">
            <Text>
              {userData.posts.length}{" "}
              <Text as="span" color="gray.400">
                posts
              </Text>
            </Text>

            <ProfileUserListDialog
              users={userData.followers}
              type="followers"
              count={userData.followers.length}
            />

            <ProfileUserListDialog
              users={userData.following}
              type="following"
              count={userData.following.length}
            />
          </HStack>
        </Stack>
      </HStack>
      <ProfilePosts user={userData} />
    </Stack>
  );
};
