import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { User } from "@/types/Post";

const UserDetail = () => {
  const [result, setResult] = useState<User | null>(null); 
  const params = useParams();

  const searchUserById = async (searchingId: string | undefined) => {
        
    if (!searchingId) return;
    try {
      const userRef = doc(db, "users", searchingId); 
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setResult(docSnap.data() as User); 
      } else {
        console.error("No such document!");
        setResult(null); 
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    searchUserById(params.userId);
  }, [params.userId]); 

  return (
    <div>
      <h1>User details</h1>
      {result ? (
        <div>
          <p><strong>Username:</strong> {result.displayName}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <img src={result.profilePicture} alt="" />
        </div>
      ) : (
        <p>User not found.</p> 
      )}
    </div>
  );
};

export default UserDetail;
