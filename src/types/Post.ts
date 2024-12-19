import type { User } from "./User";

export interface Post {
  authorId: User;
  content: string;
  imageUrl: string;
  isLikedByUser: boolean;
  likes: User[];
  timestamp: Date;
}

export interface PostForm {
  content: string;
  imageUrl: string;
}