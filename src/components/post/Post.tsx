import React, { useState } from 'react';
import { Post } from '@/types/post';
import PostActions from '@/components/post/PostActions';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    <div className='flex flex-col w-96 py-4 border-[1px] border-dark-border bg-accent-bg rounded-md mb-2'>
      <div className="flex items-center mb-4 px-4">
        <Avatar className='mr-4 w-8 h-8'>
          <AvatarImage src={post.authorId.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link to={`user/${post.authorId.displayName}`} className='font-bold text-xs'>{post.authorId.displayName}</Link>
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className='max-w-[384px] h-[384px] object-cover border border-dark-border rounded-sm mb-4' />}
      
      <PostActions
        post={post}
        onLikePost={handleLikePost}
        onAddComment={handleAddComment}
        commentText={commentText}
        onCommentChange={handleCommentChange}
      />

      <p className='text-xs my-2 px-2'><strong>{post.authorId.displayName} </strong>{post.content}</p>
    </div>
  );
};

export default PostComponent;
