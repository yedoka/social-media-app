import { collection, query, where, getDocs, doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/services/api/config";
import type { User } from "@/types/user";
import { updateProfile } from "firebase/auth";

export const checkFollowStatus = async (displayName: string) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const currentUserId = auth.currentUser.uid;
  
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("displayName", "==", displayName));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data() as User;

  if (!userData.followers) {
    return false;
  }

  const isFollower = (followerRef: User) => followerRef.id === currentUserId;
  return userData.followers.some(isFollower);
};

export const getAuthUser = () => {
  return auth.currentUser;
}

export const followUser= async (displayName: string) => {
  const currentUser = auth.currentUser;
  try {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Find user by displayName
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", displayName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const targetUser = querySnapshot.docs[0];
    const targetUserId = targetUser.id;
    const currentUserId = currentUser.uid;

    // Check if trying to follow self
    if (currentUserId === targetUserId) {
      throw new Error("You cannot follow yourself");
    }

    const userRef = doc(db, "users", targetUserId);
    const currentUserRef = doc(db, "users", currentUserId);

    await updateDoc(userRef, {
      followers: arrayUnion(currentUserRef),
    });
    await updateDoc(currentUserRef, {
      following: arrayUnion(userRef),
    });
  } catch (err) {
    console.error("Error following user:", err);
    throw err; // Re-throw to handle in the UI
  }
};

export const unfollowUser= async (displayName: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    // Find user by displayName
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", displayName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const targetUser = querySnapshot.docs[0];
    const targetUserId = targetUser.id;
    const currentUserId = auth.currentUser.uid;

    const userRef = doc(db, "users", targetUserId);
    const currentUserRef = doc(db, "users", currentUserId);

    await updateDoc(userRef, {
      followers: arrayRemove(currentUserRef),
    });
    await updateDoc(currentUserRef, {
      following: arrayRemove(userRef),
    });
  } catch (err) {
    console.error("Error unfollowing user:", err);
    throw err; // Re-throw to handle in the UI
  }
};

export const fetchCurrentLoggedUser = async () => {
  const currentUserId = auth.currentUser?.uid;
  
  if (!currentUserId) {
    return null;
  }

  try {
    const userRef = doc(db, "users", currentUserId);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as User;
  } catch (err) {
    console.error("Error fetching current user by Id:", err);
    throw err;
  }
}

export const fetchUserByUsername = async (displayName: string) => {
  const userRef = collection(db, "users");
  const q = query(userRef, where("displayName", "==", displayName));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data  = doc.data() as User;
    return { ...data, id: doc.id };
  });
};

export const fetchUserByUsernameFunc = async (displayName: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", displayName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return {
      ...userDoc.data() as User,
      id: userDoc.id
    };
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};

export const updateUserProfile = async (newUsername: string, newProfilePicture: string): Promise<void> => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: newUsername,
      photoURL: newProfilePicture,
    });

    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      displayName: newUsername,
      profilePicture: newProfilePicture,
    });
  }
};
