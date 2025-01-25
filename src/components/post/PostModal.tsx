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
import { MessageCircle } from 'lucide-react';
import { Post } from '@/types/post';

interface PostModalProps {
  post: Post;
  onAddComment: () => void;
  commentText: string;
  onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  post,
  onAddComment,
  commentText,
  onCommentChange,
}) => {
  return (
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
                className="w-8 h-8 rounded-full object-cover"
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
                <div key={index} className="flex space-x-3 items-center">
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

            <div className="flex w-full">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={onCommentChange}
                className=""
              />
              <span className='flex items-center justify-center ml-2'>
                <MessageCircle onClick={onAddComment} className="w-5 h-5 cursor-pointer text-secondary-text hover:text-primary transition-colors" />
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostModal;