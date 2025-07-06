export type TPost = {
  id: string;
  author: User;
  content: string;
  imageUrl: string;
  isLikedByUser: boolean;
  likes: string[];
  timestamp: Date;
  comments: TComment[];
};

export type TComment = {
  author: User;
  text: string;
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  followers: User[];
  following: User[];
  posts: TPost[];
};
