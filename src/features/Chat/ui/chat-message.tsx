"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { MessageWithIsFirst } from "./chat";
import { formatDate } from "@/shared/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/ui/context-menu";
import { deleteMessage } from "../model/actions/delete-message";
import { useToast } from "@/shared/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useMessages } from "../model/hooks/use-messages";

export const ChatMessage = ({
  user,
  message,
  isCurrentUser,
  messages,
}: {
  user: UserEntity;
  message: MessageWithIsFirst;
  isCurrentUser: boolean;
  messages: any[];
}) => {
  const messageDate = message.createdAt.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={`max-w-[50%] w-max  p-2 rounded-lg break-words ${
                isCurrentUser ? "bg-primary-foreground" : "bg-accent"
              }`}
            >
              {message.content}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="cursor-pointer"
              onClick={async () => {
                const deletedMessage = await deleteMessage(message.id);
                toast({
                  title: "Сообщение удалено!",
                });
                queryClient.refetchQueries({
                  queryKey: ["messages", messages],
                });
              }}
            >
              Delete message
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
};
