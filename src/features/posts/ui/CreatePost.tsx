import {
  Button,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Icon,
  Input,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Edit3 } from "lucide-react";

import { useCreatePost } from "../api";

interface FormValues {
  content: string;
  imageUrl: string;
}

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { content: "", imageUrl: "" },
  });

  const { mutateAsync: createPost, isPending } = useCreatePost(reset);

  const onSubmitPost = async (data: FormValues) => {
    await createPost(data);
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size="md">
      <Dialog.Trigger>
        <HStack
          align="center"
          gap={2}
          px={3}
          py={2}
          borderRadius="md"
          _hover={{ bg: "gray.900", cursor: "pointer" }}
        >
          <Icon size="sm">
            <Edit3 />
          </Icon>
          <Text fontSize="sm">Create post</Text>
        </HStack>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form noValidate onSubmit={handleSubmit(onSubmitPost)}>
              <Dialog.Header>
                <Dialog.Title>Create Post</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.content}>
                    <Field.Label htmlFor="content">
                      Your post content
                    </Field.Label>
                    <Input
                      id="content"
                      placeholder="Content..."
                      type="text"
                      {...register("content", {
                        required: "Post content is required",
                      })}
                    />
                    <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.imageUrl}>
                    <Field.Label htmlFor="imageUrl">Image URL</Field.Label>
                    <Input
                      id="imageUrl"
                      placeholder="URL..."
                      type="text"
                      {...register("imageUrl", {
                        required: "Image URL content is required",
                      })}
                    />
                    <Field.ErrorText>
                      {errors.imageUrl?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    type="button"
                    variant="surface"
                    onClick={() => reset()}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
