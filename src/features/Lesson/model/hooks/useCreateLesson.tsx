"use client";

import { useMutation } from "@tanstack/react-query";
import { createLessonAction } from "../actions/createLesson";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/api/query-client";
import { useCreateNotification } from "@/features/Notifications/model/hooks/use-create-notification";
import { useSession } from "next-auth/react";

export const useCreateLesson = () => {
  const { toast } = useToast();
  const session = useSession();
  const myId = session?.data?.user.id;
  const { mutate } = useCreateNotification();
  const {
    data,
    mutate: createLessonMutate,
    isPending,
  } = useMutation({
    mutationFn: async (data: {
      teacherId: string;
      studentId: string;
      date: Date;
      price: number;
      subjectId: number;
    }) => {
      const lesson = await createLessonAction(data);
      queryClient.refetchQueries({
        queryKey: ["lessons"],
      });
      queryClient.refetchQueries({
        queryKey: ["subjects"],
      });
      queryClient.refetchQueries({
        queryKey: ["subjectsWithLesson"],
      });

      return lesson;
    },
    onSuccess(data) {
      mutate({
        senderId: myId!,
        userId: data?.studentId!,
        message: "Вам назначен урок!",
        type: "lesson",
      });
      toast({
        title: "Назначено!",
      });
    },
  });

  return {
    data,
    createLessonMutate,
    isPending,
  };
};
