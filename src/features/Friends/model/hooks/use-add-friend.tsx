"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../actions/addFriend"; // Предположим, у вас есть функция для добавления друга
import { useSocket } from "@/features/Socket/ui/socket-context";
import { Notification } from "@prisma/client";
import { useCreateNotification } from "@/features/Notifications/model/hooks/use-create-notification";

export const useAddFriend = (requesterId: string, responderId: string) => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const { mutate } = useCreateNotification();

  const mutation = useMutation({
    mutationFn: () => addFriend(requesterId, responderId),
    onSuccess: (data) => {
      mutate({
        message: "let`s be friends",
        userId: responderId,
        type: "request friend",
        senderId: requesterId,
      });

      queryClient.refetchQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      console.error("Error adding friend:", error);
    },
  });

  return {
    addUserMutate: mutation.mutate,
    data: mutation.data,
  };
};
