"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubjectsWithLesson } from "../Repository/SubjectRepo";

export const useGetSubjectsWithLesson = (userId: string) => {
  const { data: subjects, isPending } = useQuery({
    queryFn: async () => {
      return await getSubjectsWithLesson(userId);
    },
    queryKey: ["subjectsWithLesson"],
  });

  return {
    subjects,
    isPending,
  };
};
