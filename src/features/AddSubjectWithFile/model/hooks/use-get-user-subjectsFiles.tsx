"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserSubjectsAndFiles } from "../actions/get-user-subjects-files";

export const useGetSubjectFiles = (userId: string) => {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const data = await getUserSubjectsAndFiles(userId);

      return data;
    },
    queryKey: ["userSubjectsWithFile"],
  });

  return {
    SubjectsAndFiles: data,
    isPending,
  };
};
