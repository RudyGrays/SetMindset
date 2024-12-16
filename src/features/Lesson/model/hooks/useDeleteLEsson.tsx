"use client";

import { useMutation } from "@tanstack/react-query";
import { removeLesson } from "../actions/removeLesson";

export const useDeleteLesson = () => {
  const {
    mutate: deleteLessonMutate,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (lessonId: string) => {
      await removeLesson(lessonId);
    },
  });

  return {
    deleteLessonMutate,
    isPending,
    data,
  };
};
