export interface User {
  displayName: string;
  email: string;
  profilePicture: string;
}

export interface Post {
  authorId: User;
  content: string;
  imageUrl: string;
  isLikedByUser: boolean;
  likes: User[];
  timestamp: Date;
}