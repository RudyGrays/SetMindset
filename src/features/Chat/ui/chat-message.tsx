"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { MessageWithIsFirst } from "./chat";
import { formatDate } from "@/shared/lib/utils";

export const ChatMessage = ({
  user,
  message,
  isCurrentUser,
}: {
  user: UserEntity;
  message: MessageWithIsFirst;
  isCurrentUser: boolean;
}) => {
  const messageDate = message.createdAt.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      className={`flex max-w-full  flex-shrink  items-center mt-2 ${
        isCurrentUser ? "justify-end" : ""
      }`}
    >
      <div
        className={`flex flex-col w-full gap-3 ${
          isCurrentUser ? "items-end" : ""
        }`}
      >
        {message.isFirst ? (
          <div
            className={`flex ${
              isCurrentUser ? "flex-row-reverse" : ""
            } items-center gap-2`}
          >
            <Link href={`/profile/${user.id}`}>
              <AppAvatar className="w-9 h-9 rounded-full" user={user} />
            </Link>

            <div
              className={
                "flex gap-4 items-center" +
                `${!isCurrentUser && " flex-row-reverse"}`
              }
            >
              <span className="text-[0.6rem] flex items-center">
                {messageDate}
              </span>
              <span>{user.name}</span>
            </div>
          </div>
        ) : (
          message.isTime && <span className="text-[0.6rem]">{messageDate}</span>
        )}
        <div
          className={`max-w-[50%] w-max  p-2 rounded-lg break-words ${
            isCurrentUser ? "bg-primary-foreground" : "bg-accent"
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
