"use client";

import { useMutation } from "@tanstack/react-query";
import { createLessonAction } from "../actions/createLesson";
import { useToast } from "@/shared/hooks/use-toast";

export const useCreateLesson = () => {
  const { toast } = useToast();
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
      return lesson;
    },
    onSuccess() {
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
