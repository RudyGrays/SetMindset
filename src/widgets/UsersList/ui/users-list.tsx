import { Avatar } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { UserOptions } from "./user-options";
import { MessageCircleMore, Phone, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { UserEntity } from "@/entities/User/model/types/User";

interface UserListProps {
  users?: UserEntity[];
}

const UsersList = ({ users }: UserListProps) => {
  return (
    <ul className="flex flex-col w-full rounded p-3 bg-accent gap-4 max-w-[800px] h-full max-h-full custom-scrollbar overflow-auto">
      {!users ? (
        <div>Пустой список пользователей</div>
      ) : (
        users.map((user) => (
          <li key={user.id} className="">
            <div className="p-2 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Link href={`/profile/${user.id}`}>
                  <AppAvatar
                    className="border h-16 w-16"
                    image={user.image!}
                    username={user.name!}
                  />
                </Link>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold px-2">{user.name}</p>
                  <div className="flex gap-3">
                    <Link
                      href={`/chat/${user.id}`}
                      className="flex gap-2 items-center hover:bg-background p-2 rounded"
                    >
                      <MessageCircleMore size={22} />
                      <p className="text-sm">Написать</p>
                    </Link>
                    <Link
                      href={`/call/${user.id}`}
                      className="flex gap-2 items-center hover:bg-background p-2 rounded"
                    >
                      <Video size={22} />
                      <p className="text-sm">Видеозвонок</p>
                    </Link>
                  </div>
                </div>
              </div>
              <UserOptions userId={user.id!} />
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default UsersList;
