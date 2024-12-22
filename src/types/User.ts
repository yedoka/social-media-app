import { Post } from "./post";

export interface User {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  followers: User[];
  following: User[];
  posts: Post[];
}