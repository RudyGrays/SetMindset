"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptFriendship } from "../actions/acceptFriendship";
import { queryClient } from "@/shared/api/query-client";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useDeleteNotification } from "@/features/Notifications/model/hooks/use-delete-notification";

export const useAcceptRequestFriend = () => {
  const { deleteNotificationMutate } = useDeleteNotification();
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async ({
      requesterId,
      responderId,
      notificationId,
    }: {
      requesterId: string;
      responderId: string;
      notificationId?: number;
    }) => {
      console.log("mutate");
      return await acceptFriendship(requesterId, responderId);
    },

    onSuccess(data, variables) {
      const { notificationId } = variables;
      if (notificationId) {
        deleteNotificationMutate({ notificationId: notificationId! });
      }

      queryClient.refetchQueries({
        queryKey: ["friends"],
      });
      queryClient.refetchQueries({
        queryKey: ["users"],
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
