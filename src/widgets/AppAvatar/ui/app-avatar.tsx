"use client";
import { UserEntity } from "@/features/Auth/model/types/User";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useSession } from "next-auth/react";

export const AppAvatar = ({
  user,
  className,

  onClick,
}: {
  user: UserEntity;
  className?: string;

  onClick?: () => void;
}) => {
  const { onlineUsers } = useSocket();
  const { image, name: username } = user;
  const session = useSession();

  const isOnline =
    onlineUsers?.some((socketUser) => socketUser.userId === user.id) ?? false;

  return (
    <div className="w-min relative">
      <Avatar onClick={onClick} className={`${className} `}>
        <AvatarImage className="object-cover" src={image!} alt={username!} />
        <AvatarFallback className="object-cover border border-secondary-foreground">
          {username ? username.slice(0, 1) : "A"}
        </AvatarFallback>
      </Avatar>
      {user.id !== session.data?.user.id && (
        <span
          className={
            "absolute  w-2 h-2 top-0 right-0 border-black border rounded-full " +
            `${isOnline ? " bg-green-500" : "bg-gray-500"}`
          }
        />
      )}
    </div>
  );
};
