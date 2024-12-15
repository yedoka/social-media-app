import React from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, db } from "@/services/firebase/firebase";
import { disable } from "@/store/slices/EditProfile";
import Button from "../Button";

interface FormInputs {
  username: string;
}

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { username: auth.currentUser?.displayName || "" },
  });

  const handleCancel = () => {
    dispatch(disable());
  };

  const handleSave: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: data.username });

        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, { displayName: data.username });

        dispatch(disable());
      } else {
        setError("username", {
          type: "manual",
          message: "User is not authenticated.",
        });
      }
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
        placeholder="Enter new username"
        {...register("username", {
          required: "Username cannot be empty.",
        })}
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
