import React from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { disable } from "@/store/slices/editProfile";
import { updateUserProfile } from "@/services/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSchema } from "@/utils/validation";
import Input from '@/components/ui/input/Input';
import Button from "@/components/ui/button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useToast } from "@/hooks/useToast";

type FormValues = {
  username: string;
  imageUrl: string;
};

interface EditFormProps {
  data: User | null | undefined;
}

const EditForm: React.FC<EditFormProps> = ({ data }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: data?.displayName || "",
      imageUrl: data?.profilePicture || "",
    },
    resolver: zodResolver(EditFormSchema),
    mode: 'onSubmit',
  });

  const mutation = useMutation({
    mutationFn: (formData: FormValues) => updateUserProfile(formData.username, formData.imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        className: "border-dark-border",
      });
      dispatch(disable());
    },
    onError: (error) => {
      toast({
        title: `Error: ${error}`,
        description: "Failed to update profile. Please try again.",
      });
    },
  });

  const handleCancel = () => {
    dispatch(disable());
  };

  const handleSave: SubmitHandler<FormValues> = async (formData) => {
    await mutation.mutateAsync(formData);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-96 mx-auto shadow-md rounded-md p-6 bg-accent-bg border border-dark-border">
      <div className="pb-6 text-neutral-300">
        <h2 className="text-2xl font-semibold mb-2">Edit profile</h2>
      </div>
      <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-6">
        <div className="grid gap-2">
          <label htmlFor="username" className="font-semibold">Username</label>
          <Input
            id="username"
            type="text"
            placeholder="New username"
            {...register("username")}
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username?.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="imageUrl" className="font-semibold">Image URL</label>
          <Input
            id="imageUrl"
            type="text"
            placeholder="Image URL"
            {...register("imageUrl")}
          />
          {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl?.message}</p>}
        </div>
        <div className="grid gap-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button type="button" className="bg-neutral-800 hover:bg-neutral-800/40" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;