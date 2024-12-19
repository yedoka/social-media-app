import { useEffect, useState } from "react";
import PostComponent from "@/components/Post"; 
import { fetchPosts } from "@/services/api/posts";
import type { Post } from "@/types/Post";
import "@/styles/globals.scss";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <PostComponent posts={posts} />
    </div>
  );
};

export default Feed;
