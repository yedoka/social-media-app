import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSchema } from "@/features/auth/lib/validation";
import { toast } from "react-toastify";
import {
  Button,
  CloseButton,
  Container,
  Dialog,
  Field,
  Heading,
  Input,
  Portal,
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
}

export const ProfileEditForm = ({ data }: EditFormProps) => {
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
    <Dialog.Root size="sm" placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(handleSave)}>
              <Dialog.Header>
                <Dialog.Title>Edit profile</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
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
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button type="submit">Save</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
