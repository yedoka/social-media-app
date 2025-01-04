import React from 'react';
import { useFetchPosts } from '@/hooks/useFetchPosts';
import PostComponent from '@/components/post/Post';

const Feed: React.FC = () => {
  const { posts, loading, error, likePost, addComment } = useFetchPosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          onLikePost={likePost}
          onAddComment={addComment}
        />
      ))}
    </div>
  );
};

export default Feed;
