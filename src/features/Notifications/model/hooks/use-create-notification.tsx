"use client";
import { useMutation } from "@tanstack/react-query";
import { createNotification } from "../actions/actions"; // асинхронный экшен
import { useSocket } from "@/features/Socket/ui/socket-context";
import { Notification } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useToast } from "@/shared/hooks/use-toast";

type CreateNotificationInput = {
  userId: string;
  message: string;
  type?: string;
  senderId: string;
};

export const useCreateNotification = () => {
  const { toast } = useToast();

  const session = useSession();
  const myId = session.data?.user.id;

  const mutation = useMutation({
    mutationFn: (notificationData: CreateNotificationInput) => {
      return createNotification(notificationData);
    },
    onSuccess: (data) => {
      toast({
        title: "Успешно отправлено!",
      });
    },
    onError: (error) => {
      console.error("Ошибка при создании уведомления:", error);
    },
  });

  return mutation;
};
