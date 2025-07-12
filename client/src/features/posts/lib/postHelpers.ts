import type { PostType, CommentType } from "@/shared/types";

export const isPostLikedByUser = (post: PostType, userId: string): boolean => {
  return post.likes.some((like) => {
    return like._id === userId;
  });
};

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

export const formatCommentDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return date.toLocaleDateString();
};
