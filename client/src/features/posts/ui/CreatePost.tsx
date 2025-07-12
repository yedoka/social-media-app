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
import { usePostStore } from "../model/usePostStore";

interface FormValues {
  text: string;
  image: string;
}

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { text: "", image: "" },
  });

  const { createPost, isPending } = usePostStore((state) => state);

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
                  <Field.Root invalid={!!errors.text}>
                    <Field.Label htmlFor="text">Your post text</Field.Label>
                    <Input
                      id="text"
                      placeholder="Content..."
                      type="text"
                      {...register("text", {
                        required: "Post text is required",
                      })}
                    />
                    <Field.ErrorText>{errors.text?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.image}>
                    <Field.Label htmlFor="image">Image URL</Field.Label>
                    <Input
                      id="image"
                      placeholder="URL..."
                      type="text"
                      {...register("image", {
                        required: "Image URL text is required",
                      })}
                    />
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
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
