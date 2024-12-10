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

interface UserListProps {
  users?: UserWithIsFriend[];
}

const UsersList = ({ users }: UserListProps) => {
  return (
    <ul className="flex flex-col w-full rounded p-3 bg-accent gap-5 max-w-[800px] h-full max-h-full custom-scrollbar overflow-auto">
      {!users?.length ? (
        <div>Пользователи не найдены...</div>
      ) : (
        users.map((user) => {
          return <UsersListItem key={user.id} user={user} />;
        })
      )}
    </ul>
  );
};

export default UsersList;
