import React from 'react';
import { likePost } from "@/services/api/posts";
import type { Post } from "@/types/Post";

interface PostComponentProps {
  posts: Post[];
}

const PostComponent: React.FC<PostComponentProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>Username: {post.authorId.displayName}</h3>
          <p>Content: {post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
          <p>
            {post.isLikedByUser
              ? "You like this post"
              : "You don't like this post"}
          </p>
          <p>{`Likes: ${post.likes.length}`}</p>
          <button onClick={() => {likePost(post.id)}}>Like</button>
          <small>Posted: {post.timestamp.toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
