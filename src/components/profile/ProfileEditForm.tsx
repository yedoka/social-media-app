import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { disable } from "@/store/slices/editProfile";
import { updateUserProfile, getCurrentUser, fetchCurrentLoggedUser } from "@/services/api/user";
import Button from "@/components/ui/button/Button";

interface FormInputs {
  username: string;
  imageUrl: string;
}

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<FormInputs | null>(null);
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<FormInputs>();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          throw new Error("No authenticated user found");
        }

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

  const handleSave: SubmitHandler<FormInputs> = async (data) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("User is not logged in!");
      }

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
      <h3>Edit Username</h3>
      <input
        type="text"
        placeholder="New username"
        defaultValue={initialData.username}
        {...register("username", {
          required: "Username cannot be empty.",
        })}
      />
      {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
      <input
        type="text"
        placeholder="Image URL"
        defaultValue={initialData.imageUrl}
        {...register("imageUrl")}
      />
      <div>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditForm;