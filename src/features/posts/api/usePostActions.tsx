import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

import { createPost } from "@/services/api/posts";

import { queryClient } from "@/app/const";

interface FormValues {
  content: string;
  imageUrl: string;
}

export const useCreatePost = (reset: UseFormReset<FormValues>) => {
  return useMutation({
    mutationFn: (data: FormValues) => createPost(data.content, data.imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      toast.success("Post created successfully!", {
        position: "bottom-right",
        theme: "dark",
      });
      reset();
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.", {
        position: "bottom-right",
        theme: "dark",
      });
    },
  });
};
