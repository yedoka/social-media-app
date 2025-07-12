import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSchema } from "@/features/auth/lib/validation";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import type { UserType } from "@/shared/types";

import { useUpdateUserProfile } from "../api";

interface FormValues {
  username: string;
  imageUrl: string;
}

interface EditFormProps {
  data: UserType;
  onCancel: () => void;
}

export const EditForm = ({ data, onCancel }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: data?.displayName || "",
      imageUrl: data?.profilePicture || "",
    },
    resolver: zodResolver(EditFormSchema),
    mode: "onSubmit",
  });
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSave: SubmitHandler<FormValues> = async (formData) => {
    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully", {
        position: "bottom-right",
        theme: "dark",
      });
      onCancel();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container centerContent={true}>
      <Heading>Edit profile</Heading>
      <form onSubmit={handleSubmit(handleSave)}>
        <Stack gap={4}>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input
              id="username"
              type="text"
              placeholder="New username"
              {...register("username")}
            />
            <Field.ErrorText>
              {errors.username && <Text>{errors.username?.message}</Text>}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.imageUrl}>
            <Field.Label>Image URL</Field.Label>
            <Input
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              {...register("imageUrl")}
            />

            <Field.ErrorText>
              {errors.imageUrl && <Text>{errors.imageUrl?.message}</Text>}
            </Field.ErrorText>
          </Field.Root>
          <Button type="submit">Save</Button>
          <Button type="button" variant="surface" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
