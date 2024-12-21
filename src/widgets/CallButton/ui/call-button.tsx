"use client";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CallButton = ({ userId }: { userId?: string }) => {
  const { onlineUsers, handleCall } = useSocket();
  const router = useRouter();
  const receiverSocketUser = onlineUsers?.find(
    (ruser) => ruser.userId === userId
  );
  const { toast } = useToast();
  return (
    <Button
      className="flex gap-2 items-center hover:bg-background p-2 rounded"
      variant={"ghost"}
      onClick={() => {
        console.log("asdasd");
        if (!receiverSocketUser) {
          return toast({
            title: "Пользователь не онлайн!",
          });
        }

        toast({
          title: "Начинаем видеозвонок!",
        });
        handleCall(receiverSocketUser);
        router.push(`/video-call/${userId}`);
      }}
    >
      <Video size={22} />
      <p className="text-sm">Videocall</p>
    </Button>
  );
};
