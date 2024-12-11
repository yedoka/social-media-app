import { useEffect, useState } from "react";
import PostComponent from "../../components/Post"; 
import { collection, getDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { Post, User } from "../../types/Post";
import "../../styles/globals.scss";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsQuery = query(collection(db, "posts"), orderBy('timestamp', 'desc'));
        
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts: Post[] = [];

        for (const docSnapshot of querySnapshot.docs) {
          const data = docSnapshot.data();

          const authorRef = data.authorID;
          const authorSnap = await getDoc(authorRef);

          if (!authorSnap.exists()) {
            console.error("Author not found for post:", docSnapshot.id);
            continue;
          }

          const authorData = authorSnap.data() as User;

          const post: Post = {
            authorId: {
              displayName: authorData.displayName,
              email: authorData.email,
              profilePicture: authorData.profilePicture,
            },
            content: data.content,
            imageUrl: data.imageUrl,
            isLikedByUser: data.isLikedByUser,
            likes: data.likes.map((like: User) => ({
              displayName: like.displayName,
              email: like.email,
              profilePicture: like.profilePicture,
            })),
            timestamp: new Date(data.timestamp.seconds * 1000),
          };

          fetchedPosts.push(post);
        }

        setPosts(fetchedPosts);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <PostComponent posts={posts} />
    </div>
  );
};

export default Feed;
