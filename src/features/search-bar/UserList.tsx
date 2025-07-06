import { User } from "@/types/user";
import { Link } from "react-router-dom";
import { Avatar, HStack, Popover, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";

interface UserListProps {
  foundUsers: User[];
  onUserSelect: () => void;
}

export const UserList = ({ foundUsers, onUserSelect }: UserListProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    onUserSelect();
    setOpen(false);
  };

  return (
    <>
      {foundUsers.slice(0, 3).map((item) => (
        <Popover.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          key={item.id}
        >
          <Popover.Trigger>
            <HStack p={4}>
              <Avatar.Root size="xs">
                <Avatar.Image src={item.profilePicture} />
                <Avatar.Fallback name={item.displayName} />
              </Avatar.Root>
              <Text fontSize="sm">{item.displayName}</Text>
            </HStack>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content className="bg-dark-bg border border-dark-border text-xs text-primary-text ">
                <Link
                  to={`/user/${item.displayName}`}
                  key={item.id}
                  className="flex items-center"
                  onClick={handleClick}
                >
                  <HStack>
                    <Avatar.Root size="xs">
                      <Avatar.Image
                        src={item.profilePicture}
                        alt={item.displayName}
                      />
                      <Avatar.Fallback name={item.displayName} />
                    </Avatar.Root>
                    <Text>{item.displayName}</Text>
                  </HStack>
                </Link>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      ))}
    </>
  );
};
