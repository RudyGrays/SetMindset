import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptFriendship } from "../actions/acceptFriendship";
import { queryClient } from "@/shared/api/query-client";

export const useAcceptRequestFriend = (
  requesterId: string,
  responderId: string
) => {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: () => acceptFriendship(requesterId, responderId),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
    },
  });

  return {
    data,
    isPending,
    error,
    mutate,
  };
};
