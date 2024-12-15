import { addDoc, collection, doc } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { auth } from "@/services/firebase/firebase";

interface PostFormInputs {
  content: string;
  imageUrl: string;
}

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<PostFormInputs>();
  const postCollectionRef = collection(db, "posts");

  const onSubmitPost: SubmitHandler<PostFormInputs> = async (data) => {
    const firestoreTimestamp = Timestamp.now();

    try {
      const authorRef = auth.currentUser ? doc(db, "users", auth.currentUser.uid) : null;

      await addDoc(postCollectionRef, {
        authorID: authorRef,
        content: data.content,
        imageUrl: data.imageUrl,
        isLikedByUser: false,
        likes: [],
        timestamp: firestoreTimestamp,
      });

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPost)}>
      <input
        placeholder="content"
        type="text"
        {...register("content", { required: true })}
      />
      <input
        placeholder="image url"
        type="text"
        {...register("imageUrl", { required: true })}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
