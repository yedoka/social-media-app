import { useForm, SubmitHandler } from "react-hook-form";
import { updateUserProfile } from "@/services/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSchema } from "@/features/auth/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { toaster } from "@/shared/ui/toaster";
import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

interface FormValues {
  username: string;
  imageUrl: string;
}

interface EditFormProps {
  data: User;
  onCancel: () => void;
}

export const EditForm = ({ data, onCancel }: EditFormProps) => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: (formData: FormValues) =>
      updateUserProfile(formData.username, formData.imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      toaster.create({
        title: "Success",
        description: "Profile updated successfully!",
        type: "success",
      });
      onCancel();
    },
    onError: (error) => {
      toaster.create({
        title: `Error: ${error}`,
        description: "Failed to update profile. Please try again.",
        type: "error",
      });
    },
  });

  const handleSave: SubmitHandler<FormValues> = async (formData) => {
    await mutation.mutateAsync(formData);
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
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="surface" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
