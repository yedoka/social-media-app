import {
  Avatar,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ProfilePosts } from "@/features/profile/ui/ProfilePosts";
import type { UserType } from "@/shared/types";

import { useUserStore } from "../model/useUserStore";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileUserList } from "./ProfileUserList";

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
              <ProfileEditForm data={userData} />
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
            <Dialog.Root size="sm" placement="center">
              <Dialog.Trigger asChild>
                <Text cursor="pointer">
                  {userData.followers.length}{" "}
                  <Text as="span" color="gray.400">
                    followers
                  </Text>
                </Text>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Followers</Dialog.Title>
                    </Dialog.Header>
                    <ProfileUserList
                      users={userData.followers}
                      type="followers"
                    />
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
            <Dialog.Root size="sm" placement="center">
              <Dialog.Trigger asChild>
                <Text cursor="pointer">
                  {userData.following.length}{" "}
                  <Text as="span" color="gray.400">
                    following
                  </Text>
                </Text>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Following</Dialog.Title>
                    </Dialog.Header>
                    <ProfileUserList
                      users={userData.following}
                      type="following"
                    />
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </HStack>
        </Stack>
      </HStack>
      <ProfilePosts user={userData} />
    </Stack>
  );
};
