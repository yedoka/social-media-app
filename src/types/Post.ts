import type { User } from "@/types/user";

export interface Post {
  id: string;
  authorId: User;
  content: string;
  imageUrl: string;
  isLikedByUser: boolean;
  likes: string[];
  timestamp: Date;
  comments: {
    author: {
      displayName: string;
      profilePicture: string;
    }
    text: string;
  }[];
}