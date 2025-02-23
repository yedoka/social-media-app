import { useForm } from "react-hook-form";
import { createPost } from "@/services/api/posts";
import { useToast } from "@/hooks/use-toast";
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

type FormValues = {
  content: string;
  imageUrl: string;
}

const CreatePost = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ defaultValues: { content: "", imageUrl: "" } });
  const { toast } = useToast();

  const onSubmitPost = async (data: FormValues) => {
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
    <form noValidate onSubmit={handleSubmit(onSubmitPost)} className='flex flex-col gap-6 rounded-md border w-80 border-dark-border p-8 bg-accent-bg'>
      <h1 className="font-bold text-lg mb-2">Create post</h1>
      <div className="grid gap-2">
        <label htmlFor="content">Your post content</label>
        <Input
          id="content"
          placeholder="Content..."
          type="text"
          {...register("content", { required: 'Post content is required' })}
        />
        { errors && <p className="text-red-500 text-xs">{errors.content?.message}</p> }
      </div>
      <div className="grid gap-2">
        <label htmlFor="imageUrl">Link to image</label>
        <Input
          id="imageUrl"
          placeholder="Image URL..."
          type="text"
          {...register("imageUrl", { required: "Image URL is required" })}
        />
        { errors && <p className="text-red-500 text-xs">{errors.imageUrl?.message}</p> }
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePost;
