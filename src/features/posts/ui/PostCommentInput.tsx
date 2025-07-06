import { useState } from "react";
import { Button, Group, Input } from "@chakra-ui/react";
import { usePost } from "@/hooks/usePost";
import { Post } from "../types";

interface PostCommentInputProps {
  post: Post;
}

export const CommentInput = ({ post }: PostCommentInputProps) => {
  const [comment, setComment] = useState("");
  const { handleAddComment } = usePost();

  const onSubmit = async () => {
    await handleAddComment(post.id, comment);
    setComment("");
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <Group attached w="full">
      <Input
        id="text"
        type="text"
        placeholder="Your comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <Button onClick={onSubmit}>Post</Button>
    </Group>
  );
};
