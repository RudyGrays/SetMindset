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
import { Bell } from "lucide-react";
import { useCreateNotification } from "../model/hooks/use-create-notification";
import { useNotifications } from "../model/hooks/use-get-notifications";
import { useSession } from "next-auth/react";
import { formatDate } from "@/shared/lib/utils";
import { useEffect } from "react";
import { Notification } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAddFriend } from "@/features/Friends/model/hooks/use-add-friend";
import { useAcceptRequestFriend } from "@/features/Friends/model/hooks/use-accept-request-friend";

export const Notifications = () => {
  const { socket } = useSocket();
  const session = useSession();
  const myId = session.data?.user.id;
  const queryClient = useQueryClient();

  const getNotification = (notification: Notification) => {
    queryClient.invalidateQueries({
      queryKey: ["notifications", notification],
    });
  };

  useEffect(() => {
    socket?.emit("joinToNotifications", myId);

    socket?.on("addNotification", getNotification);

    return () => {
      socket?.off("addNotification", getNotification);
    };
  }, [socket, myId, getNotification]);

  const { notifications } = useNotifications(myId!);

  const { mutate } = useAcceptRequestFriend();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Bell className="w-5 h-5 cursor-pointer" />
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
                  className="flex items-center max-w-full"
                >
                  {notification.message}
                  <span className="text-sm">
                    {formatDate(notification.createdAt)}
                  </span>
                  {notification.type === "request friend" && (
                    <Button
                      onClick={() => {
                        mutate({
                          requesterId: notification.senderId,
                          responderId: notification.userId,
                          notificationId: notification.id,
                        });
                      }}
                    >
                      Accept
                    </Button>
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
