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
  const { socket, call, handleCall, peer, onlineUsers, localStream } =
    useSocket();

  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [isVidOn, setIsVidOn] = useState<boolean>(false);
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>();
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack>();

  const session = useSession();
  const { toast } = useToast();
  const myId = session.data?.user.id;
  const receiverSocketUser = onlineUsers?.find(
    (user) => user.userId === userId
  );
  const { chats } = useChat(userId!);
  const chatWithUser = chats?.find(
    (chat) => chat.user1Id === myId || chat.user2Id === myId
  );

  useEffect(() => {
    if (!socket || !userId || !receiverSocketUser) {
      toast({ title: "Пользователь не в сети!" });
      return;
    }
  }, [socket, userId, receiverSocketUser]);

  useEffect(() => {
    if (!localStream) return;
    const vidTrack = localStream.getVideoTracks()[0];
    vidTrack.enabled = !vidTrack.enabled;

    const micTrack = localStream.getAudioTracks()[0];
    micTrack.enabled = !micTrack.enabled;

    setAudioTrack(micTrack);
    setVideoTrack(vidTrack);
  }, [localStream]);

  const toggleCamera = () => {
    if (localStream && videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  };

  const toggleMicro = () => {
    if (localStream && audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const isOnCall = localStream && peer && call ? true : false;
  return (
    <div className="rounded w-full max-w-[800px] max-h-full flex flex-col items-center gap-1">
      <div className="h-1/2 relative">
        {localStream ? (
          <>
            {peer && peer.stream && (
              <VideoContainer
                stream={peer?.stream}
                isLocalStream={false}
                isOnCall={isOnCall}
              />
            )}
            <div
              className="absolute cursor-pointer top-3 left-4"
              onClick={toggleCamera}
            >
              {isVidOn ? <Video /> : <VideoOff />}
            </div>
            <div
              className="absolute cursor-pointer top-3 left-14"
              onClick={toggleMicro}
            >
              {isMicOn ? <Mic /> : <MicOff />}
            </div>
            <div
              className="absolute cursor-pointer top-3 left-24"
              onClick={() => {}}
            >
              <PhoneOff />
            </div>
          </>
        ) : (
          <div className="h-full flex items-center">
            <Spinner />
          </div>
        )}
      </div>
      <div className="w-full  h-[46%]">
        <ChatGuardComponent chatId={String(chatWithUser?.id)} />
      </div>
    </div>
  );
};
