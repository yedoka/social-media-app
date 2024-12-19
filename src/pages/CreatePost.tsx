import { useForm, SubmitHandler } from "react-hook-form";
import { createPostDocument } from "@/services/firebase/posts";
import type { PostFormInputs } from "@/types/Post";


const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<PostFormInputs>();

  const onSubmitPost: SubmitHandler<PostFormInputs> = async (data) => {
    try {
      await createPostDocument(data.content, data.imageUrl);
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
