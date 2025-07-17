import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import type { UserType } from "@/shared/types";
import { ProfileUserList } from "./ProfileUserList";

interface ProfileUserListDialogProps {
  users: UserType[];
  type: "followers" | "following";
  count: number;
}

export const ProfileUserListDialog = ({
  users,
  type,
  count,
}: ProfileUserListDialogProps) => {
  const label = type === "followers" ? "followers" : "following";
  const title = type === "followers" ? "Followers" : "Following";

  return (
    <Dialog.Root size="sm" placement="center">
      <Dialog.Trigger asChild>
        <Text cursor="pointer">
          {count}{" "}
          <Text as="span" color="gray.400">
            {label}
          </Text>
        </Text>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <ProfileUserList users={users} type={type} />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
