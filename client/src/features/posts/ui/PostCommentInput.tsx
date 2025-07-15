import { useState } from "react";
import { Button, Group, Input } from "@chakra-ui/react";

import { usePostStore } from "../model/usePostStore";

interface PostCommentInputProps {
  postId: string;
}

export const PostCommentInput = ({ postId }: PostCommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const { addComment } = usePostStore();

  const onSubmit = async () => {
    await addComment(postId, commentText);
    setCommentText("");
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  return (
    <Group attached w="full">
      <Input
        id="text"
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={handleCommentChange}
        size="xs"
      />
      <Button onClick={onSubmit} size="xs">
        Post
      </Button>
    </Group>
  );
};
