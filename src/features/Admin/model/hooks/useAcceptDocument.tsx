"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptDocumentAction } from "../actions/acceptDocument";

export const useAcceptDocument = () => {
  const queryClient = useQueryClient();

  const { mutate: acceptDocumentMutate } = useMutation({
    mutationFn: ({ documentId }: { documentId: number }) => {
      return acceptDocumentAction(documentId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["userSubjectsWithFile"],
      });
    },
  });

  return {
    acceptDocumentMutate,
  };
};
