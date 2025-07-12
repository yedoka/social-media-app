import { useState } from "react";

import { Input, InputGroup, Stack, Text } from "@chakra-ui/react";

import { useUserStore } from "@/features/profile/model/useUserStore";
import { Search } from "lucide-react";
import { UserList } from "./UserList";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { searchUsers, searchResults } = useUserStore();

  const handleChange = async (value: string) => {
    setSearchTerm(value);
    if (value.trim().length > 2) {
      try {
        await searchUsers(value);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
  };

  return (
    <Stack>
      <InputGroup endElement={<Search />}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search user..."
        />
      </InputGroup>
      {searchResults.length === 0 ? (
        <Text>User not found</Text>
      ) : (
        <UserList foundUsers={searchResults} onUserSelect={() => {}} />
      )}
    </Stack>
  );
};
