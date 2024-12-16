import { Avatar } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { UserOptions } from "./user-options";
import { MessageCircleMore, Phone, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { UserEntity } from "@/entities/User/model/types/User";
import { UsersListItem } from "./users-list-item";
import { use } from "react";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { ScrollArea } from "@/shared/ui/scroll-area";

interface UserListProps {
  users?: UserWithIsFriend[];
  onChange?: (...args: any) => void;
}

const UsersList = ({ users, onChange }: UserListProps) => {
  return (
    <ScrollArea className="flex flex-col w-full border-b  rounded p-3  gap-5 max-w-[800px] max-h-full ">
      {!users?.length ? (
        <div className="text-center">Пользователи не найдены...</div>
      ) : (
        users.map((user) => {
          return (
            <UsersListItem
              onChangeHandler={onChange}
              key={user.id}
              user={user}
            />
          );
        })
      )}
    </ScrollArea>
  );
};

export default UsersList;
