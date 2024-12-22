"use client";

import { useSocket } from "@/features/Socket/ui/socket-context";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const CallNotification = () => {
  const { OngoingCall, handleJoinCall } = useSocket();
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  return (
    <Dialog open={OngoingCall?.isRinging}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Звонок</DialogTitle>
          <DialogDescription>
            <span>
              Входящий звонок от {OngoingCall?.participants.caller.profile.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              OngoingCall && handleJoinCall(OngoingCall);
              router.push(
                `/Video-call/${OngoingCall?.participants.caller.userId}`
              );
            }}
          >
            Принять
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
