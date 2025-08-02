export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

export interface CreatePostData {
  text: string;
  image?: string;
}

export interface CreateCommentData {
  text: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  followers: UserType[];
  following: UserType[];
  posts: PostType[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentType {
  _id: string;
  user: UserType;
  text: string;
  createdAt: string;
}

export interface PostType {
  _id: string;
  user: UserType;
  text: string;
  image: string;
  likes: UserType[];
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedUser
  extends Omit<UserType, "followers" | "following" | "posts"> {
  followers: UserType[];
  following: UserType[];
  posts: PostType[];
}

export interface PopulatedPost
  extends Omit<PostType, "user" | "likes" | "comments"> {
  user: UserType;
  likes: UserType[];
  comments: PopulatedComment[];
}

export interface MessageType {
  _id: string;
  senderId: UserType;
  receiverId: UserType;
  text: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedComment extends Omit<CommentType, "user"> {
  user: UserType;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type UserResponse = ApiResponse<UserType>;
export type PostResponse = ApiResponse<PostType>;
export type UsersResponse = PaginatedResponse<UserType>;
export type PostsResponse = PaginatedResponse<PostType>;
