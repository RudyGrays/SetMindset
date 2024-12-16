"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addSubjectAndFileAction } from "../model/actions/addSubjectAction";
import { useSession } from "next-auth/react";
import { useAddSubjectAndUploadFile } from "../model/hooks/use-upload-file";

const subjectSchema = z.object({
  subjectName: z.string().min(1, "Название предмета обязательно"),
  fileContent: z
    .custom((file) => file instanceof FileList, "Не является FileList")
    .refine((file) => (file as FileList).length > 0, "Файл не выбран"),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;

export const SubjectForm: React.FC<{ userId: string }> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
  });

  const { addSubjectMutate } = useAddSubjectAndUploadFile();
  const onSubmit = async (data: SubjectFormValues) => {
    const file = (data.fileContent as FileList)[0];

    if (!userId) return console.log(userId);
    if (!file) return;
    addSubjectMutate({
      data: { fileContent: file, subjectName: data.subjectName },
      userId: userId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full w-full flex flex-col gap-3"
    >
      <h2 className="text-center">Документы</h2>
      <div>
        <Label htmlFor="subjectName">Название предмета</Label>
        <Input
          id="subjectName"
          placeholder="Введите название"
          {...register("subjectName")}
          className="mt-1"
        />
        {errors.subjectName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subjectName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="fileContent">Файл с подтверждением</Label>
        <Input
          accept=".png,.jpeg,.jpg,.docx,.doc"
          type="file"
          id="fileContent"
          {...register("fileContent")}
          className="mt-1"
        />
        {errors.fileContent && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fileContent.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-4">
        Добавить запись
      </Button>
    </form>
  );
};
