export type PostType = {
  id: string;
  author: UserType;
  content: string;
  imageUrl: string;
  isLikedByUser: boolean;
  likes: string[];
  timestamp: Date;
  comments: CommentType[];
};

export type CommentType = {
  author: UserType;
  text: string;
};

export type UserType = {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  followers: UserType[];
  following: UserType[];
  posts: PostType[];
};
