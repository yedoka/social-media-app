import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { Post, PostForm } from "@/types/Post";
import type { User } from "@/types/User";

export const postCollectionRef = collection(db, "posts")

export async function likePost(postId: string) {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }
  const currentUserId = auth.currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const postRef= doc(db, "posts", postId);
  
  try {
    await updateDoc(postRef, {
      likes: arrayUnion(currentUserRef),
      isLikedByUser: true
    })  
  } catch (err) {
    console.error(err);
  }
}

export async function createPost(payload: PostForm): Promise<void> {
  const firestoreTimestamp =  Timestamp.now();
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const authorRef = doc(db, "users", auth.currentUser.uid);
  const postRef = doc(collection(db, "posts"));

  try {
    await setDoc(postRef, {
      authorID: authorRef,
      content: payload.content,
      imageUrl: payload.imageUrl,
      isLikedByUser: false,
      timestamp: firestoreTimestamp, 
      likes: [],
    });
    await updateDoc(authorRef, {
      posts: arrayUnion(postRef)
    })
    
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
      id: docSnapshot.id,
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