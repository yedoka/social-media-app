import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/services/api/config";
import type { TPost, User } from "@/shared/types";

export const postsCollectionRef = collection(db, "posts");

function getAuthenticatedUserRef(): DocumentReference {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated");
  }
  return doc(db, "users", currentUser.uid);
}

export async function likePost(postId: string) {
  const currentUserRef = getAuthenticatedUserRef();
  const currentUserId = currentUserRef.id;
  const postRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postRef);
  const postData = postDoc.data();
  const likes = postData?.likes || [];
  const isLiked = likes.some(
    (like: DocumentReference) => like.id === currentUserId
  );
  try {
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(currentUserRef) : arrayUnion(currentUserRef),
      isLikedByUser: !isLiked,
    });
  } catch (err) {
    console.error(err);
  }
}

export const addComment = async (postId: string, text: string) => {
  const author = getAuthenticatedUserRef();
  const postRef = doc(db, "posts", postId);
  try {
    await updateDoc(postRef, {
      comments: arrayUnion({
        author,
        text: text,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};

export async function createPost(
  content: string,
  imageUrl: string
): Promise<void> {
  const firestoreTimestamp = Timestamp.now();
  const authorRef = getAuthenticatedUserRef();
  const postRef = doc(collection(db, "posts"));
  try {
    await setDoc(postRef, {
      author: authorRef,
      content,
      imageUrl,
      isLikedByUser: false,
      timestamp: firestoreTimestamp,
      likes: [],
      comments: [],
    });
    await updateDoc(authorRef, {
      posts: arrayUnion(postRef),
    });
  } catch (err) {
    console.error("Error adding post", err);
  }
}

export async function deletePost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, "posts", postId);
    const userRef = getAuthenticatedUserRef();

    await updateDoc(userRef, {
      posts: arrayRemove(postRef),
    });

    await deleteDoc(postRef);

    console.log(`Post ${postId} deleted successfully`);
  } catch (err) {
    console.error("Failed to delete post:", err);
  }
}

function sortPostsByTimestampDesc(posts: TPost[]): TPost[] {
  return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function getPosts(): Promise<TPost[]> {
  const postQuery = query(collection(db, "posts"));
  const querySnapshot = await getDocs(postQuery);
  const fetchedPosts: TPost[] = [];
  for (const docSnapshot of querySnapshot.docs) {
    const data = docSnapshot.data();
    const authorRef = data.author;
    const authorSnap = await getDoc(authorRef);
    if (!authorSnap.exists()) {
      console.error("Author not found for post: ", docSnapshot.id);
      continue;
    }
    const authorData = authorSnap.data() as User;
    const comments = await Promise.all(
      (data.comments || []).map(
        async (comment: { text: string; author: DocumentReference<User> }) => {
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
        }
      )
    );

    const post: TPost = {
      id: docSnapshot.id,
      author: { ...authorData },
      content: data.content,
      imageUrl: data.imageUrl,
      isLikedByUser: data.isLikedByUser,
      likes: data.likes.map((like: User) => ({
        displayName: like.displayName,
        email: like.email,
        profilePicture: like.profilePicture,
      })),
      timestamp: new Date(data.timestamp.seconds * 1000),
      comments: comments.filter(Boolean),
    };

    fetchedPosts.push(post);
  }
  return sortPostsByTimestampDesc(fetchedPosts);
}

export async function getUserPosts(email: string): Promise<TPost[]> {
  try {
    const userDocs = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    if (userDocs.empty) {
      console.error("User not found in database");
      return [];
    }
    const userDocRef = doc(db, "users", userDocs.docs[0].id);
    const postsSnapshot = await getDocs(
      query(collection(db, "posts"), where("author", "==", userDocRef))
    );
    const posts = await Promise.all(
      postsSnapshot.docs.map(async (postDoc) => {
        const data = postDoc.data();
        const authorData = userDocs.docs[0].data() as User;
        const comments = await Promise.all(
          (data.comments || []).map(
            async (comment: {
              text: string;
              author: DocumentReference<User>;
            }) => {
              const snap = await getDoc(comment.author);
              if (!snap.exists()) return null;
              const commentAuthor = snap.data() as User;
              return {
                text: comment.text,
                author: {
                  displayName: commentAuthor.displayName,
                  profilePicture: commentAuthor.profilePicture,
                },
              };
            }
          )
        );
        return {
          id: postDoc.id,
          author: authorData,
          content: data.content,
          imageUrl: data.imageUrl,
          isLikedByUser: data.isLikedByUser || false,
          likes: (data.likes || []).map((like: User) => ({
            displayName: like.displayName,
            email: like.email,
            profilePicture: like.profilePicture,
          })),
          timestamp: new Date(data.timestamp.seconds * 1000),
          comments: comments.filter(Boolean),
        } as TPost;
      })
    );

    return posts
      .filter(Boolean)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}
