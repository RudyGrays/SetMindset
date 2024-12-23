"use client";

import { useSocket } from "@/features/Socket/ui/socket-context";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Bell, BellDot, X } from "lucide-react";
import { useCreateNotification } from "../model/hooks/use-create-notification";
import { useNotifications } from "../model/hooks/use-get-notifications";
import { useSession } from "next-auth/react";
import { formatDate } from "@/shared/lib/utils";
import { useEffect } from "react";
import { Message, Notification } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAddFriend } from "@/features/Friends/model/hooks/use-add-friend";
import { useAcceptRequestFriend } from "@/features/Friends/model/hooks/use-accept-request-friend";
import Link from "next/link";
import { useDeleteNotification } from "../model/hooks/use-delete-notification";
import { removeFriend } from "@/features/Friends/model/actions/removeFriend";
import { useChatId } from "@/features/Chat/ui/chat-context";
import { useToast } from "@/shared/hooks/use-toast";
import { dbClient } from "@/shared/db/prisma.client";
import { getUserById } from "@/features/Users/model/actions/getUserById";
import { useCurrentChat } from "@/features/Chat/model/hooks/use-current-chat";

export const Notifications = () => {
  const { socket } = useSocket();
  const session = useSession();
  const myId = session.data?.user.id;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const getNotification = (notification: Notification) => {
    queryClient.invalidateQueries({
      queryKey: ["notifications", notification],
    });
  };
  const { chat } = useChatId();

  const getMessageNotification = async (message: Message) => {
    if (chat && +chat === message.chatId) return;
    const sender = await getUserById(message.senderId);
    toast({
      title: `Пришло сообщение от ${sender?.name}`,
      description: (
        <Link href={`/chats/${message.chatId}`}>
          <span>
            {`${message.content.substring(0, 10)}${
              message.content.length > 10 ? "..." : ""
            }`}
          </span>
          <Button variant={"ghost"}>Перейти в чат</Button>
        </Link>
      ),
    });
  };
  useEffect(() => {
    socket?.on("receiveMessageNotification", getMessageNotification);

    return () => {
      socket?.off("receiveMessageNotification", getMessageNotification);
    };
  }, [socket, chat]);

  useEffect(() => {
    socket?.emit("joinToNotifications", myId);

    socket?.on("addNotification", getNotification);

    return () => {
      socket?.off("addNotification", getNotification);
    };
  }, [socket, myId]);

  const { notifications } = useNotifications(myId!);

  const { mutate } = useAcceptRequestFriend();
  const { deleteNotificationMutate } = useDeleteNotification();
  return (
    <Sheet>
      <SheetTrigger asChild>
        {notifications.length > 0 ? (
          <BellDot className="w-5 h-5 cursor-pointer" />
        ) : (
          <Bell className="w-5 h-5 cursor-pointer" />
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">
            Your notification`s list
          </SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {notifications.length === 0 ? (
            <div>Empty notifications list</div>
          ) : (
            notifications.map((notification) => {
              return (
                <div
                  key={notification.id}
                  className="flex items-center w-full  rounded-xl p-1 max-w-full"
                >
                  {notification.type === "request friend" && (
                    <div className="flex w-full items-center justify-between">
                      Запрос дружбы
                      <span className="text-sm">
                        {formatDate(notification.createdAt)}
                      </span>
                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          mutate({
                            requesterId: notification.senderId,
                            responderId: notification.userId,
                            notificationId: notification.id,
                          });
                          deleteNotificationMutate({
                            notificationId: notification.id,
                          });
                        }}
                      >
                        Accept
                      </Button>
                      <X
                        className=" cursor-pointer"
                        onClick={() => {
                          removeFriend(
                            notification.senderId,
                            notification.userId
                          );
                          deleteNotificationMutate({
                            notificationId: notification.id,
                          });
                        }}
                      />
                    </div>
                  )}
                  {notification.type === "lesson" && (
                    <div className="flex items-center gap-1">
                      {notification.message}
                      <span className="text-sm">
                        {formatDate(notification.createdAt)}
                      </span>
                      <Link
                        href={"/lessons"}
                        onClick={() => {
                          deleteNotificationMutate({
                            notificationId: notification.id,
                          });
                        }}
                      >
                        <Button variant={"outline"}>Посмотреть</Button>
                      </Link>

                      <X
                        className=" cursor-pointer"
                        onClick={() => {
                          deleteNotificationMutate({
                            notificationId: notification.id,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
