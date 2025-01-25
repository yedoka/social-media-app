import { DocumentReference } from "firebase/firestore";

export interface User {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  followers: User[];
  following: User[];
  posts: DocumentReference[];
}