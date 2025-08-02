import { useState } from "react";

import {
  Input,
  InputGroup,
  Stack,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Search, X } from "lucide-react";

import { useUserSearch } from "@/features/profile";
import { useDebounce } from "../hooks/useDebounce";
import { UserList } from "./UserList";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { results: searchResults, isLoading: isLoadingSearch } = useUserSearch(
    debouncedSearchTerm.trim().length >= 2 ? debouncedSearchTerm : ""
  );

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleUserSelect = () => {
    setSearchTerm("");
  };

  return (
    <Stack>
      <InputGroup
        endElement={
          <HStack>
            {isLoadingSearch && <Spinner size="md" />}
            {searchTerm && (
              <X
                size={16}
                cursor="pointer"
                onClick={handleClearSearch}
                aria-label="Clear search"
              />
            )}
            <Search size={16} />
          </HStack>
        }
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search users..."
          aria-label="Search for users"
        />
      </InputGroup>

      {searchTerm.trim().length >= 2 && (
        <>
          {isLoadingSearch ? (
            <HStack justify="center" py={4}>
              <Spinner size="md" />
              <Text fontSize="sm" color="gray.500">
                Searching...
              </Text>
            </HStack>
          ) : searchResults && searchResults.length === 0 ? (
            <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>
              No users found for "{searchTerm}"
            </Text>
          ) : (
            <UserList
              foundUsers={searchResults || []}
              onUserSelect={handleUserSelect}
            />
          )}
        </>
      )}
    </Stack>
  );
};
