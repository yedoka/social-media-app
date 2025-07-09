import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

import { createPost } from "@/services/api/posts";

import { addComment, deletePost, likePost } from "@/services/api/posts";

interface FormValues {
  content: string;
  imageUrl: string;
}

export const useCreatePost = (reset: UseFormReset<FormValues>) => {
  const queryClient = useQueryClient();
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

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => await likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
    },
    onError: (error) => {
      console.error("Error liking a post: ", error);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
    },
    onError: (error) => {
      console.error("Error deleting a post: ", error);
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, text }: { postId: string; text: string }) =>
      await addComment(postId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
    onError: (error) => {
      console.error("Error adding comment to post: ", error);
    },
  });
};
