import { useEffect, useState, useRef } from "react";

import {
  Input,
  InputGroup,
  Stack,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Search, X } from "lucide-react";

import { useUserStore } from "@/features/profile/model/userStore";
import { useDebounce } from "../hooks/useDebounce";
import { UserList } from "./UserList";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { searchUsers, searchResults, isLoadingSearch, clearSearchResults } =
    useUserStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      clearSearchResults();
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (debouncedSearchTerm.trim().length >= 2) {
      abortControllerRef.current = new AbortController();
      searchUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchUsers, clearSearchResults]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    clearSearchResults();
  };

  const handleUserSelect = () => {
    setSearchTerm("");
    clearSearchResults();
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
