"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsRepository } from "../repository/NotificationsRepository";
import { deleteNotification } from "../actions/delete";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteNotificationMutate } = useMutation({
    mutationFn: async ({ notificationId }: { notificationId: number }) => {
      return deleteNotification(notificationId);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return {
    deleteNotificationMutate,
  };
};
