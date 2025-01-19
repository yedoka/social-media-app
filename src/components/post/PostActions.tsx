import React from 'react';
import { Post } from '@/types/post';
import { Heart, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from 'react-router-dom';

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
    <div className="space-y-2">
      <div className="flex gap-4">
        <Heart
          onClick={() => onLikePost(post.id)}
          fill={post.isLikedByUser ? 'red' : 'none'}
          className={`w-5 h-5 cursor-pointer transition-colors hover:text-red-500 ${
            post.isLikedByUser ? 'text-red-500' : 'text-secondary-text'
          }`}
        />
        <Dialog>
          <DialogTrigger asChild>
            <MessageCircle className="w-5 h-5 cursor-pointer text-secondary-text hover:text-primary transition-colors" />
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 gap-0 rounded-lg bg-accent-bg border border-dark-border">
            <div className="grid grid-cols-2 divide-x divide-gray-800">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.authorId.profilePicture} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <Link 
                    to={`profile/${post.authorId}`}
                    className="font-semibold text-secondary-text hover:text-primary transition-colors"
                  >
                    {post.authorId.displayName}
                  </Link>
                </div>
                
                {post.imageUrl && (
                  <div className="relative aspect-square">
                    <img 
                      src={post.imageUrl} 
                      alt="Post" 
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-200">{post.authorId.displayName}</span>{' '}
                  {post.content}
                </p>
              </div>

              <div className="p-6 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-secondary-text">
                    Comments
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-400">
                    Join the conversation below
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="group flex space-x-3">
                      <img 
                        src={comment.author.profilePicture} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold text-primary-text">{comment.author.displayName}</span>{' '}
                          <span className="text-secondary-text">{comment.text}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={onCommentChange}
                    className=""
                  />
                  <Button 
                    onClick={onAddComment} 
                    className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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