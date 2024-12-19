"use client";
import { UserEntity } from "@/features/Auth/model/types/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Error } from "@/shared/ui/error";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";

import { Button } from "@/shared/ui/button";
import { useUpdateProfile } from "@/features/Auth/model/hooks/use-update-profile";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";
import { SubjectForm } from "@/features/AddSubjectWithFile/ui/add-subject-form";
import { SubjectAndFileList } from "@/features/AddSubjectWithFile/ui/subject-file-list";
import { useGetSubjectFiles } from "@/features/AddSubjectWithFile/model/hooks/use-get-user-subjectsFiles";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useSession } from "next-auth/react";
import { CopyButton } from "@/widgets/CopyButton/ui/CopyButton";
import { FilledStar } from "@/features/Rating/ui/filled-star";
import { Star } from "@/features/Rating/ui/star";
import { Stars } from "@/features/Rating/ui/stars";
import { SelectedStars } from "@/features/Rating/ui/selected-stars";

const MAX_FILE_SIZE = 2 * 1024 * 1024; //2mb

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(25, "Имя должно содержать максимум 25 символов")
    .nullable()
    .optional(),
  image: z.string().optional().nullable(),
});

export const EditableProfileCard = ({
  user,
  isNew,
}: {
  user: UserEntity;
  isNew?: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: user.name,
      image: user.image || "",
    },
  });

  const { SubjectsAndFiles, isPending: subjectsPending } = useGetSubjectFiles(
    user.id!
  );

  const session = useSession();

  const myId = session.data?.user.id;
  const myRole = session.data?.user.role;

  const { profileMutate, data, isPending } = useUpdateProfile();
  const router = useRouter();
  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    profileMutate({
      userId: user.id!,
      name: values.name!,
      image: values.image!,
    });

    !isPending && isNew && router.push("/");
  };
  const { getValues } = form;

  return (
    <Card className="max-h-full overflow-auto custom-scrollbar p-4 relative">
      <CopyButton
        data={`${process.env.NEXT_PUBLIC_URL}/profile/${user.id}`}
        className={"absolute top-3 right-2"}
      >
        Поделиться профилем
      </CopyButton>
      <CardContent>
        {myRole === "ADMIN" && user.id !== myId && user.canTeach ? (
          <div className="flex flex-col w-full gap-1">
            Рейтинг преподавателя: <Stars userId={user.id!} />
            Вы поставили: <SelectedStars myId={myId!} userId={user.id!} />
          </div>
        ) : user.canTeach ? (
          <div className="flex flex-col w-full">
            Рейтинг преподавателя: <Stars userId={user.id!} />
          </div>
        ) : null}

        <div className="flex flex-col gap-3 max-h-full overflow-auto custom-scrollbar">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex w-full justify-center">
                <AppAvatar
                  className="h-20 w-20"
                  image={getValues().image!}
                  username={user.name!}
                />
              </div>
              <FormField
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Аватар</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ссылка на картинку..." />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Имя пользователя..." />
                    </FormControl>
                    <Error error={fieldState.error} />
                  </FormItem>
                )}
              />
              {isNew ? (
                <Button disabled={isPending} type="submit">
                  {isPending ? <Spinner /> : "Continue"}
                </Button>
              ) : (
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-max mt-5"
                >
                  {isPending ? <Spinner /> : "Save changes"}
                </Button>
              )}
            </form>
          </Form>
          <div className="flex flex-col gap-3 mt-4">
            {myRole === "ADMIN" && user.id !== myId ? null : (
              <SubjectForm userId={user.id!} />
            )}
            {subjectsPending ? (
              <div className="flex w-full items-center">
                <Spinner />
              </div>
            ) : (
              <SubjectAndFileList list={SubjectsAndFiles} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
