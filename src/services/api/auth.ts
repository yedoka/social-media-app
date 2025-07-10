import { auth, db } from "@/shared/config/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email,
        displayName,
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        followers: [],
        following: [],
        posts: [],
      });
    }

    return { success: true, userCredential };
  } catch (error: unknown) {
    return { success: false, message: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, userCredential };
  } catch (error: unknown) {
    return { success: false, message: error.message };
  }
};

export const logout = async () => {
  return signOut(auth);
};

export const getToken = async () => {
  const token = auth.currentUser?.getIdToken();

  if (token) {
    return token;
  } else {
    return null;
  }
};
