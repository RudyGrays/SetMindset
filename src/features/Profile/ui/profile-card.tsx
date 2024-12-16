"use client";
import { useGetSubjectFiles } from "@/features/AddSubjectWithFile/model/hooks/use-get-user-subjectsFiles";
import { SubjectForm } from "@/features/AddSubjectWithFile/ui/add-subject-form";
import { SubjectAndFileList } from "@/features/AddSubjectWithFile/ui/subject-file-list";
import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { CopyButton } from "@/widgets/CopyButton/ui/CopyButton";
import { useSession } from "next-auth/react";

export const ProfileCard = ({ user }: { user: UserEntity }) => {
  const { SubjectsAndFiles, isPending: subjectsPending } = useGetSubjectFiles(
    user.id!
  );
  const session = useSession();
  return (
    <Card className="max-h-full overflow-auto custom-scrollbar p-4 relative">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <AppAvatar
            className="h-20 w-20"
            image={user.image!}
            username={user.name!}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CopyButton data={user.id!} className={"absolute top-3 right-2"}>
          Поделиться профилем
        </CopyButton>
        <div>Username: {user.name}</div>
        <label className="flex gap-3 items-center">
          Email:
          <CopyButton data={user.email}>{user.email}</CopyButton>
        </label>
      </CardContent>
      <div className="flex flex-col gap-3 mt-4">
        {user.id === session.data?.user.id && user.role !== "ADMIN" && (
          <SubjectForm userId={user.id!} />
        )}
        {subjectsPending ? (
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <SubjectAndFileList list={SubjectsAndFiles} />
        )}
      </div>
    </Card>
  );
};
