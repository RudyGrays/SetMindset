"use client";

import { useSession } from "next-auth/react";
import { useGetUsersWithUpdate } from "../model/hooks/useGetUsersWithUpdate";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { formatDate } from "@/shared/lib/utils";
import { Spinner } from "@/shared/ui/spinner";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { useAcceptUserUpdates } from "../model/hooks/useAcceptUserUpdates";

export const UsersWithUpdateTable = () => {
  const session = useSession();
  const myId = session.data?.user.id;
  const router = useRouter();
  const { usersWithUpdate, isPending } = useGetUsersWithUpdate(myId!);
  const { acceptUserUpdatesMutate } = useAcceptUserUpdates();
  return (
    <Table className="w-full h-full py-2 overflow-auto custom-scrollbar">
      <TableCaption>A list of updated users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Аватар</TableHead>
          <TableHead>Имя пользователя</TableHead>
          <TableHead>Дата обновления</TableHead>
          <TableHead>Действие</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithUpdate ? (
          usersWithUpdate.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <AppAvatar
                    className="cursor-pointer"
                    onClick={() => router.push(`/profile/${user.id}`)}
                    user={user}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{formatDate(user.updatedAt)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      acceptUserUpdatesMutate({ userId: user.id! });
                    }}
                    variant={"outline"}
                  >
                    Подтвердить
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : isPending ? (
          <TableRow>
            <TableCell />
            <TableCell>
              <Spinner />
            </TableCell>
            <TableCell />
          </TableRow>
        ) : (
          <TableRow>
            <TableCell />
            <TableCell>Список пуст</TableCell>
            <TableCell />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
