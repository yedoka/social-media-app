import { useState } from "react";
import { Button, Group, Input } from "@chakra-ui/react";

import { usePostComments } from "../model";

interface PostCommentInputProps {
  postId: string;
}

export const PostCommentInput = ({ postId }: PostCommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const { addComment, isAdding } = usePostComments();

  const onSubmit = async () => {
    if (commentText.trim()) {
      addComment(postId, commentText);
      setCommentText("");
    }
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
      <Button
        onClick={onSubmit}
        size="xs"
        disabled={isAdding || !commentText.trim()}
      >
        Post
      </Button>
    </Group>
  );
};
