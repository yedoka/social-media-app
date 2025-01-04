import { useState, useEffect } from "react";
import { fetchPosts, likePost, addComment } from "@/services/api/posts";
import { Post } from "@/types/post";
import { auth } from "@/services/api/config";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(`Error loading posts: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLikePost = async (postId: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await likePost(postId);
      
      await loadPosts();
    } catch (err) {
      console.error("Error", err);
    }
  };

  const handleAddComment = async (postId: string, text: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await addComment(text, postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { 
              ...post, 
              comments: [
                ...post.comments, 
                { 
                  author: { 
                    displayName: auth.currentUser?.displayName || "Anonymous", 
                    profilePicture: auth.currentUser?.photoURL || "" 
                  }, 
                  text 
                }
              ]
            }
            : post
        )
      );
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return { posts, loading, error, likePost: handleLikePost, addComment: handleAddComment };
};
