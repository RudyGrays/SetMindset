"use client";
import { useGetSubjectFiles } from "@/features/AddSubjectWithFile/model/hooks/use-get-user-subjectsFiles";
import { SubjectForm } from "@/features/AddSubjectWithFile/ui/add-subject-form";
import { SubjectAndFileList } from "@/features/AddSubjectWithFile/ui/subject-file-list";
import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { useSession } from "next-auth/react";

export const ProfileCard = ({ user }: { user: UserEntity }) => {
  const { SubjectsAndFiles, isPending: subjectsPending } = useGetSubjectFiles(
    user.id!
  );
  const session = useSession();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль пользователя: {user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Почта: {user.email}</div>
        <AppAvatar image={user.image!} />
      </CardContent>
      <div className="flex flex-col gap-3 mt-4">
        {user.id === session.data?.user.id && user.role !== "ADMIN" && (
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
    </Card>
  );
};
