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
import { useUserStore } from "../model/useUserStore";

interface FormValues {
  name: string;
  avatar: string;
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
      name: data?.name || "",
      avatar: data?.avatar || "",
    },
    resolver: zodResolver(EditFormSchema),
    mode: "onSubmit",
  });
  const { updateProfile } = useUserStore();

  const handleSave: SubmitHandler<FormValues> = async (formData) => {
    try {
      await updateProfile(formData);
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
          <Field.Root invalid={!!errors.name}>
            <Field.Label>name</Field.Label>
            <Input
              id="name"
              type="text"
              placeholder="New name"
              {...register("name")}
            />
            <Field.ErrorText>
              {errors.name && <Text>{errors.name?.message}</Text>}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.avatar}>
            <Field.Label>Image URL</Field.Label>
            <Input
              id="avatar"
              type="text"
              placeholder="Image URL"
              {...register("avatar")}
            />

            <Field.ErrorText>
              {errors.avatar && <Text>{errors.avatar?.message}</Text>}
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
