import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { auth, db } from "./config";
import { Post, PostForm } from "@/types/Post";
import type { User } from "@/types/User";

export const postCollectionRef = collection(db, "posts")

export async function createPost(payload: PostForm): Promise<void> {
  const firestoreTimestamp =  Timestamp.now();
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const authorRef = doc(db, "users", auth.currentUser.uid);

  try {
    await addDoc(postCollectionRef, {
      authorID: authorRef,
      content: payload.content,
      imageUrl: payload.imageUrl,
      isLikedByUser: false,
      likes: [],
      timestamp: firestoreTimestamp, 
    });
  } catch (err) {
    console.error("Error adding post", err);
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const postQuery = query(collection(db, 'posts'), orderBy("timestamp", 'desc'));
  const querySnapshot = await getDocs(postQuery);
  const fetchedPosts: Post[] = [];

  for (const docSnapshot of querySnapshot.docs) {
    const data = docSnapshot.data();

    const authorRef = data.authorID;
    const authorSnap = await getDoc(authorRef);

    if(!authorSnap.exists()) {
      console.error("Author not found for post: ", docSnapshot.id);
      continue;
    }

    const authorData = authorSnap.data() as User;

    const post: Post = {
      authorId: { ...authorData },
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

  return fetchedPosts;
}