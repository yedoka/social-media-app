import { useState } from "react";
import { Button, Group, Input } from "@chakra-ui/react";
import { TPost } from "@/shared/types";
import { useAddComment } from "../api/usePostActions";

interface PostCommentInputProps {
  post: TPost;
}

export const CommentInput = ({ post }: PostCommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const { mutateAsync: addComment } = useAddComment();

  const onSubmit = async () => {
    await addComment({ postId: post.id, text: commentText });
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
        placeholder="Your comment..."
        value={commentText}
        onChange={handleCommentChange}
      />
      <Button onClick={onSubmit}>Post</Button>
    </Group>
  );
};
