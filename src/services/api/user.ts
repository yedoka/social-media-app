import { collection, query, where, getDocs, doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "@/services/api/config";
import type { User } from "@/types/User";
import { updateProfile } from "firebase/auth";

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const follow = async (userId: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const currentUserId = auth.currentUser.uid

    const userRef = doc(db, "users", userId);
    const currentUserRef = doc(db, "users", currentUserId);

    const userSnap = await getDoc(userRef);
    const currentUserSnap = await getDoc(currentUserRef)
    if (userSnap.id !== currentUserSnap.id) {
      await updateDoc(userRef, {
        followers: arrayUnion(currentUserRef)
      })
  
      await updateDoc(currentUserRef, {
        following: arrayUnion(userRef)
      })  
    } else {
      throw new Error("Can not follow yourself")
    }
  } catch (err) {
    console.error(err);
  }
}

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return null;
  } catch(err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }  
}

export const fetchUserByUsername = async (displayName: string): Promise<User[]> => {
  const userRef = collection(db, "users");
  const q = query(userRef, where("displayName", "==", displayName));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const { id, ...data } = doc.data() as User;
    return { id: doc.id, ...data };
  });
};

export const updateUserProfile = async (newUsername: string, newProfilePicture: string):Promise<void> => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: newUsername, photoURL: newProfilePicture });
    
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, { displayName: newUsername, profilePicture: newProfilePicture });
  }
}