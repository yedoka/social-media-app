import type { PostType, CommentType, UserType } from "@/shared/types";

export const getLikesCount = (post: PostType): number => {
  return post.likes.length;
};

export const canDeleteComment = (
  comment: CommentType,
  userId: string
): boolean => {
  if (typeof comment.user === "string") {
    return comment.user === userId;
  }
  return comment.user._id === userId;
};

export const getCommentsCount = (comments: CommentType[]): number => {
  return comments.length;
};

export const checkIsLikedByUser = (likes: UserType[], userId: string) => {
  return likes.some((likedUser) => likedUser._id === userId);
};
