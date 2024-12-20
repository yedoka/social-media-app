import { useState } from "react";
import { useNavigate } from "react-router";
import type { User } from "@/types/User";
import { fetchUserByUsername } from "@/services/api/user";

const FindUser = () => {
  const [results, setResults] = useState<User[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const searchUser = async (searchTerm: string) => {
    try {
      const fetchedResults = await fetchUserByUsername(searchTerm);
      if (fetchedResults.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
      setResults(fetchedResults);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Find User</h1>
      <input
        type="text"
        placeholder="Username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={() => searchUser(searchUsername)}>Find</button>

      <div>
        <h1>Results:</h1>
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} onClick={() => navigate(`${result.id}`)}>
              <p><strong>Username:</strong> {result.displayName}</p>
            </div>
          ))
        ) : (
          error && <span style={{ color: "red" }}>User not found</span>
        )}
      </div>
    </div>
  );
};

export default FindUser;
