import React, { useState } from 'react';
import { Post } from '@/types/post';
import PostActions from '@/components/post/PostActions';

interface PostComponentProps {
  post: Post;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, onLikePost, onAddComment }) => {
  const [commentText, setCommentText] = useState<string>('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div>
      <h3>{post.authorId.displayName}</h3>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      <PostActions
        post={post}
        onLikePost={onLikePost}
        onAddComment={handleAddComment}
        commentText={commentText}
        onCommentChange={handleCommentChange}
      />
    </div>
  );
};

export default PostComponent;
