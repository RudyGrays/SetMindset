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

export const CallNotification = () => {
  const { call, handleJoinCall } = useSocket();
  const session = useSession();
  const user = session.data?.user;

  return (
    <Dialog open={call?.isRinging}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Звонок</DialogTitle>
          <DialogDescription>
            <span>
              Входящий звонок от {call?.participants.caller.profile.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              call && handleJoinCall(call);
            }}
          >
            Принять
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
