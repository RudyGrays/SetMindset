"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { ScrollArea } from "@/shared/ui/scroll-area";
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
import { Check } from "lucide-react";
import { Button } from "react-day-picker";

export const LessonUsersTable = ({
  users,
  onClick,
  currentUser,
}: {
  users: UserEntity[];
  onClick: (...args: any) => void;
  currentUser?: UserEntity;
}) => {
  return (
    <ScrollArea className="max-h-full rounded-xl">
      <Table>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow
                onClick={() => onClick(user)}
                className="bg-accent cursor-pointer"
                key={user.id}
              >
                <TableCell>
                  <AppAvatar image={user.image!} username={user.name!} />
                </TableCell>
                <TableCell className="text-sm ">{user.name}</TableCell>
                {currentUser && currentUser.id === user.id ? (
                  <TableCell className="font-medium">
                    <Check />
                  </TableCell>
                ) : (
                  <TableCell className="font-medium"></TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
