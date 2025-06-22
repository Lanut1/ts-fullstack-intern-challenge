import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "../api/likes.api";

interface LikeMutationVariables {
  catId: string;
  isLiked: boolean;
}

export function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ catId, isLiked }: LikeMutationVariables) => {
      return isLiked ? removeLike(catId) : addLike(catId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedCats'] });
    },
  });
}