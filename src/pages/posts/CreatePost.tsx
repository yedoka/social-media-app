import { useForm } from "react-hook-form";
import { createPost } from "@/services/api/posts";
import type { PostForm } from "@/types/post";
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<PostForm>();
  const { toast } = useToast();

  const onSubmitPost = async (data: PostForm) => {
    try {
      await createPost(data);
      toast({
        title: "Success",
        description: "Your post was created successfully!",
        className: "border-dark-border"
      })
      reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
      })
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmitPost)} className='flex flex-col rounded-md border w-80 border-dark-border p-8  bg-accent-bg'>
      <h1 className="font-bold text-lg mb-2">Create post</h1>
      <label className="text-xs mb-2">Your post content</label>
      <Input
        className="mb-4"
        placeholder="content"
        type="text"
        {...register("content", { required: true })}
      />
      <label className="text-xs mb-2">Link to image</label>
      <Input
        className="mb-4"
        placeholder="image url"
        type="text"
        {...register("imageUrl", { required: true })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePost;
