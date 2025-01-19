import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { disable } from "@/store/slices/editProfile";
import { updateUserProfile, fetchCurrentLoggedUser } from "@/services/api/user";
import Button from "@/components/ui/button/Button";

interface FormInputs {
  username: string;
  imageUrl: string;
}

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<FormInputs | null>(null);
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<FormInputs>();

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

  useEffect(() => {
    loadUserData();
  }, [reset]);

  const handleCancel = () => {
    dispatch(disable());
  };

  const handleSave: SubmitHandler<FormInputs> = async (data) => {
    try {
      await updateUserProfile(data.username, data.imageUrl);
      dispatch(disable());
    } catch (err) {
      if (err instanceof Error) {
        setError("username", {
          type: "manual",
          message: err.message,
        });
      } else {
        setError("username", {
          type: "manual",
          message: "Unknown error occurred.",
        });
      }
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h3 className="mb-4">Edit Username</h3>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="text"
          placeholder="New username"
          defaultValue={initialData.username}
          className="block w-full px-2 py-1 border rounded-md text-xs text-accent-bg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          {...register("username", {
            required: "Username cannot be empty.",
          })}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        <input
          type="text"
          placeholder="Image URL"
          defaultValue={initialData.imageUrl}
          className="block w-full px-2 py-1 border rounded-md text-xs text-accent-bg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          {...register("imageUrl")}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditForm;