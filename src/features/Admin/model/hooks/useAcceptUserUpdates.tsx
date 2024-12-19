"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptDocumentAction } from "../actions/acceptDocument";
import { acceptUserUpdates } from "../repo/admin-repo";

export const useAcceptUserUpdates = () => {
  const queryClient = useQueryClient();

  const { mutate: acceptUserUpdatesMutate } = useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      return acceptUserUpdates(userId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["usersWithUpdate"],
      });
    },
  });

  return {
    acceptUserUpdatesMutate,
  };
};
