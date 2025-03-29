import React from "react";
import { useFeedPosts } from "@/hooks/useFeedPosts";
import PostComponent from "@/components/post/Post";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ErrorMessage from "@/components/ui/spinner/ErrorMessage";
import EmptyState from "@/components/ui/spinner/EmptyState";

const Feed: React.FC = () => {
  const { data: posts, isLoading, error } = useFeedPosts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Failed to load posts."} />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState message="No posts available." />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;