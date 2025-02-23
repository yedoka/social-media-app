import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { disable } from "@/store/slices/editProfile";
import { updateUserProfile, fetchCurrentLoggedUser } from "@/services/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSchema } from "@/utils/validation";
import Input from '@/components/ui/input/Input';
import Button from "@/components/ui/button/Button";

type FormValues = {
  username: string;
  imageUrl: string;
}

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<FormValues | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({defaultValues: {
    username: initialData?.username,
    imageUrl: initialData?.imageUrl
  },
  resolver: zodResolver(EditFormSchema),
  mode: 'onSubmit'
  });
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const fetchedUser = await fetchCurrentLoggedUser();
        if (!fetchedUser) {
          throw new Error("Failed to fetch user data");
        }
        const userData = {
          username: fetchedUser.displayName || '',
          imageUrl: fetchedUser.profilePicture || '',
        };
        setInitialData(userData);
        reset(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    loadUserData();
  }, [reset]);

  const handleCancel = () => {
    dispatch(disable());
  };

  const handleSave: SubmitHandler<FormValues> = async (data) => {
    try {
      await updateUserProfile(data.username, data.imageUrl);
      dispatch(disable());
    } catch (err) {
      console.error("Error occurred:", err)
    }
  };

  if (!initialData) {
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
          <Button type="submit">Save</Button>
          <Button type="button" className="bg-neutral-800 hover:bg-neutral-800/40" onClick={handleCancel}>
          Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;