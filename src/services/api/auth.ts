import { auth, db } from '@/services/api/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async ( email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
    const userRef = doc(db, 'users', userCredential.user.uid);

    await setDoc(userRef, {
      email,
      displayName,
      profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
      followers: [],
      following: [],
      posts: [],
    });
  }

  return userCredential;
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};
