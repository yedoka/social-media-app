import React, { useState } from 'react';
import { Post } from '@/types/post';
import PostActions from '@/components/post/PostActions';
import { Link } from 'react-router-dom';

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

  const handleLikePost = () => {
    onLikePost(post.id);
  };

  return (
    <div className='flex flex-col w-96 py-4 border-b-[1px]'>
      <div className="flex items-center mb-4">
        <img src={post.authorId.profilePicture} alt="profile picture" className='rounded-full w-8 mr-4' />
        <Link to={`profile/${post.authorId}`} className='font-bold'>{post.authorId.displayName}</Link>
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className='border border-dark-border rounded-sm mb-4' />}
      
      <PostActions
        post={post}
        onLikePost={handleLikePost}
        onAddComment={handleAddComment}
        commentText={commentText}
        onCommentChange={handleCommentChange}
      />

      <p className='text-xs my-2'><strong>{post.authorId.displayName} </strong>{post.content}</p>
    </div>
  );
};

export default PostComponent;
