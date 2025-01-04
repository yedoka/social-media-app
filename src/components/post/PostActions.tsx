import React from 'react';
import { Post } from '@/types/post';

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
    <div>
      <button onClick={() => onLikePost(post.id)}>
        {post.isLikedByUser ? 'Unlike' : 'Like'}
      </button>
      <p>{`Likes: ${post.likes.length}`}</p>
      <p>{`Comments: ${post.comments.length}`}</p>

      <div>
        {post.comments.map((comment, index) => (
          <p key={index}>{comment.author.displayName}: {comment.text}</p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Add a comment"
        value={commentText}
        onChange={onCommentChange}
      />
      <button onClick={onAddComment}>Comment</button>
    </div>
  );
};

export default PostActions;
