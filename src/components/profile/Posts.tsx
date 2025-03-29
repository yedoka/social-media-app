import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom";
import { useProfilePosts } from "@/hooks/useProfilePosts";

interface PostsProps {
  user: User
}

const Posts: React.FC<PostsProps> = ({ user }) => {
  const { data: posts , isLoading, isError, error } = useProfilePosts(user);
  
  if (isLoading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        {error.message || "Failed to load posts"}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center py-4">No posts yet</div>;
  }

  return (
    <div className="grid bg-accent-bg border border-dark-border rounded-md p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[768px]">
      {posts.map((post) => (
        <div key={post.id} className="aspect-square rounded-lg overflow-hidden">
          <Dialog>
            <DialogTrigger asChild>
              <img
                src={post.imageUrl}
                alt={post.content}
                className="w-full h-full object-cover"
              />
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
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
        </div>
      ))}
    </div>
  );
};

export default Posts;