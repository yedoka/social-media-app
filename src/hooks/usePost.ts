import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deletePost, getPosts, likePost } from '@/services/api/posts';

export const usePost = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['feedPosts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: async (postId: string) => await likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['profilePosts'] });
    },
    onError: (error) => {
      console.error('Error liking a post: ', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      queryClient.invalidateQueries({ queryKey: ['profilePosts'] });
    },
    onError: (error) => {
      console.error('Error deleting a post: ', error);
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: async ({ postId, text }: { postId: string, text: string }) => await addComment(postId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
    },
    onError: (error) => {
      console.error('Error adding comment to post: ', error);
    },
  });

  const handleLikePost = async (postId: string) => {
    await likeMutation.mutate(postId);
  };

  const handleDeletePost = async (postId: string) => {
    await deleteMutation.mutate(postId);
  };

  const handleAddComment = async (postId: string, text: string) => {
    await addCommentMutation.mutate({ postId, text });
  };

  return { data, isLoading, error, handleLikePost, handleDeletePost, handleAddComment }
};