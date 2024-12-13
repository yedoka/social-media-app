import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { User } from "../../types/Post";
import { useNavigate } from "react-router";

const FindUser = () => {
  const [results, setResults] = useState<User[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const searchUser = async (searchTerm: string) => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("displayName", "==", searchTerm));
      const querySnapshot = await getDocs(q);

      const fetchedResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as User, 
      })) as User[];

      if (fetchedResults.length === 0) {
        setError(true);
      } else {
        setError(false);
      }

      setResults(fetchedResults);
    } catch (err) {
      console.error(err);
      setError(true);
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
            <div onClick={() => navigate(`${result.id}`)}>
              <p><strong>Username:</strong> {result.displayName}</p>
            </div>
          ))
        ) : (
          !error && <p>No results to display</p> 
        )}
      </div>

      {error && <span style={{ color: "red" }}>User not found</span>}
    </div>
  );
};

export default FindUser;