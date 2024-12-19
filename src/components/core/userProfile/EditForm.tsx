import React from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { disable } from "@/store/slices/EditProfile";
import Button from "../Button";
import { updateUserProfile } from "@/services/firebase/user";

interface FormInputs {
  username: string;
  imageUrl: string;
}

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>();

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

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h3>Edit Username</h3>
      <input
        type="text"
        placeholder="New username"
        {...register("username", {
          required: "Username cannot be empty.",
        })}
      />
      <input
      type="text"
      placeholder="Image URL"
      {...register("imageUrl")}
      />
      {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
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
