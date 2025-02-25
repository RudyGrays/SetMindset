"use client";

import { useUsersForAdmin } from "../model/hooks/useGetUsersForAdmin";
import { useSession } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { Spinner } from "@/shared/ui/spinner";

export const UsersForAdminTable = ({
  searchValue,
}: {
  searchValue?: string;
}) => {
  const session = useSession();
  const myId = session.data?.user.id;
  const { users, isLoading } = useUsersForAdmin(myId!, searchValue);
  const router = useRouter();
  return (
    <div className="w-full py-2 max-h-full h-full ">
      <Table className="mb-2">
        <TableCaption>A list of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users ? (
            users.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/profile/${user.id}`)}
                >
                  <TableCell>
                    <AppAvatar user={user} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
              );
            })
          ) : isLoading ? (
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
              <TableCell>Empty list</TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
