import { useState } from "react";
import { searchUsers } from "@/services/api/user";
import { User } from "@/types/user";
import UserList from "@/components/searchBar/UserList";
import Input from "@/components/ui/input/Input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
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
    <div className="bg-dark-bg space-y-4 border border-dark-border rounded-sm p-4">
      <div className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search user..."
        />
        <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </span>

      </div>
      {
        userNotFound ? (
          <p>User not found</p>
        ) : (
          <UserList foundUsers={results} onUserSelect={handleUserSelect} />

        )
      }
    </div>
  );
}
