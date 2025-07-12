// Base interfaces for creation (what you send to API)
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

// Full interfaces for data received from API
export interface UserType {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  followers: UserType[]; // Can be populated or not
  following: UserType[]; // Can be populated or not
  posts: PostType[]; // Can be populated or not
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CommentType {
  _id: string;
  user: UserType; // Can be populated or not
  text: string;
  createdAt: string; // ISO date string
}

export interface PostType {
  _id: string;
  user: UserType; // Can be populated or not
  text: string;
  image: string;
  likes: UserType[]; // Can be populated or not
  comments: CommentType[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Utility types for when you know the population state
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

export interface PopulatedComment extends Omit<CommentType, "user"> {
  user: UserType;
}

// API response types
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

// Common API responses
export type UserResponse = ApiResponse<UserType>;
export type PostResponse = ApiResponse<PostType>;
export type UsersResponse = PaginatedResponse<UserType>;
export type PostsResponse = PaginatedResponse<PostType>;
