"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export const ChatMessage = ({
  user,
  message,
  isCurrentUser,
}: {
  user: UserEntity;
  message: Message;
  isCurrentUser: boolean;
}) => {
  const session = useSession();

  const messageDate = message.createdAt.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      className={`flex items-center mt-2 ${isCurrentUser ? "justify-end" : ""}`}
    >
      <div
        className={`flex flex-col w-full gap-3 ${
          isCurrentUser ? "items-end" : ""
        }`}
      >
        <div
          className={`flex ${
            isCurrentUser ? "flex-row-reverse" : ""
          } items-center gap-2`}
        >
          <Link href={`/profile/${user.id}`}>
            <AppAvatar
              className="w-9 h-9 rounded-full"
              image={user.image!}
              username={user.name!}
            />
          </Link>

          <div className="flex gap-4 items-center">
            <span className="text-[0.6rem]">{messageDate}</span>
            <span>{user.name}</span>
          </div>
        </div>

        <div
          className={`max-w-[70%] w-max  p-2 rounded-lg break-words ${
            isCurrentUser ? "bg-primary-foreground" : "bg-accent"
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
