"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubjectsByUserIdAction } from "../actions/getSubjectsByUserIdAction";

export const useGetUserSubjects = (userId: string) => {
  const { data: subjects, isPending } = useQuery({
    queryFn: async () => {
      return await getSubjectsByUserIdAction(userId);
    },
    queryKey: ["subjects"],
  });

  return {
    subjects,
    isPending,
  };
};
