import React from 'react';
import { useForm } from "react-hook-form";
import { createPost } from "@/services/api/posts";
import type { PostForm } from "@/types/post";

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<PostForm>();

  const onSubmitPost = async (data: PostForm) => {
    try {
      await createPost(data);
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
