import { useState } from "react";

import { Link } from "react-router-dom";
import { Avatar, HStack, Popover, Portal, Text } from "@chakra-ui/react";

import type { UserType } from "@/shared/types";

interface UserListProps {
  foundUsers: UserType[];
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
          key={item._id}
        >
          <Popover.Trigger>
            <HStack p={4}>
              <Avatar.Root size="xs">
                <Avatar.Image src={item.avatar} />
                <Avatar.Fallback name={item.name} />
              </Avatar.Root>
              <Text fontSize="sm">{item.name}</Text>
            </HStack>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content className="bg-dark-bg border border-dark-border text-xs text-primary-text ">
                <Link
                  to={`/user/${item.name}`}
                  key={item._id}
                  className="flex items-center"
                  onClick={handleClick}
                >
                  <HStack>
                    <Avatar.Root size="xs">
                      <Avatar.Image src={item.avatar} alt={item.name} />
                      <Avatar.Fallback name={item.name} />
                    </Avatar.Root>
                    <Text>{item.name}</Text>
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
