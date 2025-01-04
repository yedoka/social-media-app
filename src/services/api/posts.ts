import { arrayRemove, arrayUnion, collection, doc, DocumentReference, getDoc, getDocs, orderBy, query, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { Post, PostForm } from "@/types/post";
import type { User } from "@/types/user";

export const postCollectionRef = collection(db, "posts")

export async function likePost(postId: string) {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }
  const currentUserId = auth.currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const postRef = doc(db, "posts", postId);
  
  const postDoc = await getDoc(postRef);
  const postData = postDoc.data();
  const likes = postData?.likes || [];
  const isLiked = likes.some((like: DocumentReference) => like.id === currentUserId);
 
  try {
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(currentUserRef) : arrayUnion(currentUserRef),
      isLikedByUser: !isLiked
    });
  } catch (err) {
    console.error(err);
  }
}

export const addComment = async (text: string, postId: string) => {
  if (!auth.currentUser) throw new Error("User not auth")
  const author = doc(db, "users", auth.currentUser.uid);
  const postRef= doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      comments: arrayUnion({
        author,
        text: text
      })
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
      comments: []
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

    const comments = await Promise.all(
      (data.comments || []).map(async (comment: { text: string; author: DocumentReference<User> }) => {
        const authorSnap = await getDoc(comment.author);
        if (!authorSnap.exists()) {
          console.warn("Author not found for comment");
          return null;
        }
        const commentAuthorData = authorSnap.data() as User;
        return {
          text: comment.text,
          author: {
            displayName: commentAuthorData.displayName,
            profilePicture: commentAuthorData.profilePicture,
          },
        };
      })
    );

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
      comments: comments
    };

    fetchedPosts.push(post);
  }

  return fetchedPosts;
}