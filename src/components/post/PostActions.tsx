import React from "react";
import { Post } from "@/types/post";
import { Heart } from "lucide-react";
import PostModal from "@/components/post/PostModal";
import { useFeedPosts } from "@/hooks/useFeedPosts";

interface PostActionsProps {
  post: Post;
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const { handleLikePost, handleAddComment } = useFeedPosts();

  return (
    <div className="px-4 py-2">
      <div className="flex gap-4">
        <Heart
          onClick={() => handleLikePost(post.id)}
          fill={post.isLikedByUser ? "red" : "none"}
          className={`w-4 h-4 cursor-pointer transition-colors hover:text-red-500 ${
            post.isLikedByUser ? "text-red-500" : "text-secondary-text"
          }`}
        />
        <PostModal post={post} onAddComment={handleAddComment} />
      </div>

      {post.likes.length > 0 && (
        <p className="text-sm text-gray-400">
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
};

export default PostActions;
