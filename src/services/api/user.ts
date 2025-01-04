import { collection, query, where, getDocs, doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/services/api/config";
import type { User } from "@/types/user";
import { updateProfile } from "firebase/auth";

export const isFollowingUser = async (userId: string) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const currentUserId = auth.currentUser.uid;

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists) {
    return false;
  }
  const userData = userSnap.data() as User;
  if (!userData.followers) {
    return false;
  }

  const isFollower = (followerRef: User) => followerRef.id === currentUserId;
  const followers = userData.followers;
  const isUserFollowing = followers.some(isFollower);
  
  return isUserFollowing;
};

export const isUserLoggedIn = (): boolean => {
  if (auth.currentUser) {
    return true;
  } else {
    return false
  }
};

export const getCurrentUser = async () => {
  return auth.currentUser;
}

export const followUser = async (userId: string) => {
  const currentUser = auth.currentUser;
  try {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    const { uid: currentUserId } = currentUser;
    if (currentUserId === userId) {
      throw new Error("You can not follow yourself")
    }

    const userRef = doc(db, "users", userId);
    const currentUserRef = doc(db, "users", currentUserId);

    await updateDoc(userRef, {
      followers: arrayUnion(currentUserRef),
    });
    await updateDoc(currentUserRef, {
      following: arrayUnion(userRef),
    });
  } catch (err) {
    console.error(err);
  }
};

export const unfollowUser = async (userId: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }
    const { uid: currentUserId } = auth.currentUser;

    const userRef = doc(db, "users", userId);
    const currentUserRef = doc(db, "users", currentUserId);

    await updateDoc(userRef, {
      followers: arrayRemove(currentUserRef),
    });

    await updateDoc(currentUserRef, {
      following: arrayRemove(userRef),
    });
  } catch (err) {
    console.error(err);
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

export const fetchUser = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
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
