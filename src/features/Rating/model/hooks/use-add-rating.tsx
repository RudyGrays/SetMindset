"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddRatingAction } from "../actions/add-rating";
import { useToast } from "@/shared/hooks/use-toast";

export const useAddRating = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: addRatingMutate } = useMutation({
    mutationFn: async ({
      fromId,
      toId,
      ratingValue,
    }: {
      fromId: string;
      toId: string;
      ratingValue: number;
    }) => {
      return AddRatingAction(fromId, toId, ratingValue);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["selected-rating"],
      });
      queryClient.refetchQueries({
        queryKey: ["rating"],
      });
      toast({
        title: `Рейтинг ${data.rating} поставлен!`,
      });
    },
  });

  return {
    addRatingMutate,
  };
};
