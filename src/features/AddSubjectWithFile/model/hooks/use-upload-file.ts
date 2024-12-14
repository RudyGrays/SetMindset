"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSubjectAndFileAction } from "../actions/addSubjectAction";
import { SubjectFormValues } from "../../ui/add-subject-form";
import { useSession } from "next-auth/react";
import { useToast } from "@/shared/hooks/use-toast";

export const useAddSubjectAndUploadFile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isPending, data, mutate } = useMutation({
    mutationFn: ({ data, userId }: { data: any; userId: string }) => {
      console.log(data, userId);
      return addSubjectAndFileAction({
        file: data.fileContent,
        subject: {
          name: data.subjectName,
        },
      });
    },

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["userSubjectsWithFile"],
      });
      toast({
        title: "Успешно добавлено!",
      });
    },
  });

  return {
    addSubjectMutate: mutate,
    isPending,
    data,
  };
};
