import { useState } from "react";

import { Search } from "lucide-react";
import { Input, InputGroup, Stack, Text } from "@chakra-ui/react";

import { searchUsers } from "@/services/api";
import type { UserType } from "@/shared/types";
import { UserList } from "@/features/search-bar/ui/UserList";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<UserType[]>([]);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const handleChange = async (value: string) => {
    setSearchTerm(value);

    if (value.trim().length > 2) {
      try {
        const res = await searchUsers(value);
        setResults(res);
        setUserNotFound(res.length === 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setResults([]);
        setUserNotFound(true);
      }
    } else {
      setResults([]);
      setUserNotFound(false);
    }
  };

  const handleUserSelect = () => {
    setSearchTerm("");
    setResults([]);
    setUserNotFound(false);
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
      {userNotFound ? (
        <Text>User not found</Text>
      ) : (
        <UserList foundUsers={results} onUserSelect={handleUserSelect} />
      )}
    </Stack>
  );
};
