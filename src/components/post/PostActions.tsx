import React from 'react';
import { Post } from '@/types/post';
import { Heart } from 'lucide-react';
import PostModal from '@/components/post/PostModal';

interface PostActionsProps {
  post: Post;
  onLikePost: (postId: string) => void;
  onAddComment: () => void;
  commentText: string;
  onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  onLikePost,
  onAddComment,
  commentText,
  onCommentChange,
}) => {
  return (
    <div className="space-y-2 px-2">
      <div className="flex gap-4">
        <Heart
          onClick={() => onLikePost(post.id)}
          fill={post.isLikedByUser ? 'red' : 'none'}
          className={`w-5 h-5 cursor-pointer transition-colors hover:text-red-500 ${
            post.isLikedByUser ? 'text-red-500' : 'text-secondary-text'
          }`}
        />
        <PostModal post={post} onAddComment={onAddComment} commentText={commentText} onCommentChange={onCommentChange} />
      </div>
      
      {post.likes.length > 0 && (
        <p className="text-sm text-gray-400">
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
        </p>
      )}
    </div>
  );
};

export default PostActions;