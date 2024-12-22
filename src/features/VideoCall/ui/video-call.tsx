"use client";

import { useChat } from "@/features/Chat/model/hooks/use-chat";
import { useCreateChat } from "@/features/Chat/model/hooks/use-create-chat";
import { Chat } from "@/features/Chat/ui/chat";
import { ChatGuardComponent } from "@/features/Chat/ui/chat-guard-component";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useToast } from "@/shared/hooks/use-toast";
import { Spinner } from "@/shared/ui/spinner";
import { VideoContainer } from "@/widgets/VideoContainer/ui/video-container";
import { Camera, Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const VideoCall = ({ userId }: { userId: string }) => {
  const { socket, OngoingCall, peer, onlineUsers, localStream } = useSocket();

  const session = useSession();

  const myId = session.data?.user.id;
  const receiverSocketUser = onlineUsers?.find(
    (user) => user.userId === userId
  );
  const { chats } = useChat(userId!);
  const chatWithUser = chats?.find(
    (chat) => chat.user1Id === myId || chat.user2Id === myId
  );

  const isOnCall = localStream && peer && OngoingCall ? true : false;
  return (
    <div className="rounded w-full max-w-[800px] max-h-full flex flex-col items-center gap-1">
      <div className="h-1/2 relative">
        {localStream ? (
          <div className="relative max-h-full">
            {peer && peer.stream && (
              <VideoContainer
                stream={peer.stream}
                isLocalStream={false}
                isOnCall={isOnCall}
              />
            )}
            <VideoContainer
              stream={localStream}
              isLocalStream={true}
              isOnCall={isOnCall}
            />
          </div>
        ) : (
          <div className="h-full flex items-center">
            <Spinner />
          </div>
        )}
      </div>
      <div className="w-full  h-[46%]">
        {chatWithUser && (
          <ChatGuardComponent chatId={String(chatWithUser?.id)} />
        )}
      </div>
    </div>
  );
};
