import { fetchUserByUsername } from "@/services/api/user";
import { User } from "@/types/user";
import { useState } from "react";
import Results from "./Results";

export default function FindUser() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);

  const handleChange = async (value: string) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await fetchUserByUsername(value);
      setResults(res);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search user..."
      />
      <Results foundUsers={results} />
    </div>
  );
}
