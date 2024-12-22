"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { useRouter } from "next/navigation";
import { addOnlineUser } from "../model/actions/add-online-user";
import { removeOnlineUser } from "../model/actions/remove-online-user";
import { Message } from "@prisma/client";
import { useChatId } from "@/features/Chat/ui/chat-context";
import { getUserById } from "@/features/Users/model/actions/getUserById";
import { toast } from "@/shared/hooks/use-toast";
interface iSocketContext {
  socket?: Socket;
  isSocketConnected: boolean;
  handleCall: (receiver: SocketUser) => void;
  onlineUsers?: SocketUser[];
  localStream?: MediaStream;
  handleJoinCall: (call: OngoingCall) => void;
  OngoingCall?: OngoingCall;
  peer?: PeerData;
}
export interface SocketUser {
  userId: string;
  socketId: string;
  profile: UserEntity;
}
export interface OngoingCall {
  participants: Participants;
  isRinging: boolean;
}

export interface Participants {
  caller: SocketUser;
  receiver: SocketUser;
}

export interface PeerData {
  peerConnection: Peer.Instance;
  stream?: MediaStream;
  partipantUser: SocketUser;
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket>();
  const [isSocketConnected, setSocketIsConnected] = useState<boolean>(false);
  const [peer, setPeer] = useState<PeerData>();

  const myId = session?.user.id;
  //onlineUsers
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);

  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === myId
  );

  //stream
  const [localStream, setLocalStream] = useState<MediaStream>();

  const getMediaStream = useCallback(
    async (faceMode?: string) => {
      if (localStream) return localStream;

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 360, ideal: 720, max: 1080 },
            frameRate: { min: 16, ideal: 30, max: 30 },
            facingMode: videoDevices.length > 0 ? faceMode : undefined,
          },
        });
        setLocalStream(stream);
        return stream;
      } catch (err) {
        console.log("Fail to get the stream", err);
        setLocalStream(undefined);
        return undefined;
      }
    },
    [localStream]
  );

  //call
  const [OngoingCall, setOngoingCall] = useState<OngoingCall>();

  const handleJoinCall = useCallback(
    async (call: OngoingCall) => {
      setOngoingCall((prev) => {
        if (prev) {
          return { ...prev, isRinging: false };
        }
        return prev;
      });

      const stream = await getMediaStream();

      if (!stream) {
        console.log("Could not get stream in handleJoinCall");
        return;
      }

      const newPeer = createPeer(stream, true);

      setPeer({
        peerConnection: newPeer,
        partipantUser: call.participants.caller,
        stream: undefined,
      });

      const signal = async (data: SignalData) => {
        if (socket) {
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall: call,
            isCaller: false,
          });
        }
      };

      newPeer.on("signal", signal);

      return () => {
        newPeer.off("signal", signal);
      };
    },
    [socket, currentSocketUser]
  );

  const handleCall = useCallback(
    async (receiver: SocketUser) => {
      if (OngoingCall) return;
      if (!currentSocketUser || !socket) return;

      const stream = await getMediaStream();

      if (!stream) {
        console.log("No stream");
        return;
      }
      const participants: Participants = {
        caller: currentSocketUser,
        receiver: receiver,
      };

      setOngoingCall({ participants, isRinging: false });
      socket?.emit("call", participants);
    },
    [socket, currentSocketUser, OngoingCall]
  );

  const handleHangup = useCallback(({}) => {}, []);

  const onIncomingCallHandle = useCallback(
    (participants: Participants) => {
      setOngoingCall({
        participants,
        isRinging: true,
      });
    },
    [socket, currentSocketUser, setOngoingCall]
  );

  //peer

  const createPeer = useCallback(
    (stream: MediaStream, initiator: boolean) => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun.l.google.com:5349",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ];

      const peer = new Peer({
        stream,
        initiator,
        trickle: true,
        config: { iceServers },
      });

      peer.on("stream", (stream) => {
        setPeer((prevPeer) => {
          if (prevPeer) {
            return { ...prevPeer, stream };
          }
          return prevPeer;
        });
      });

      peer.on("error", (err) => console.log("Ошибка пира ", err));
      peer.on("close", () => handleHangup({}));
      const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc;

      rtcPeerConnection.oniceconnectionstatechange = async () => {
        if (
          rtcPeerConnection.iceConnectionState === "disconnected" ||
          rtcPeerConnection.iceConnectionState === "failed"
        ) {
          handleHangup({});
        }
      };
      return peer;
    },
    [OngoingCall, setPeer]
  );

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData;
      ongoingCall: OngoingCall;
      isCaller: boolean;
    }) => {
      if (!localStream) {
        console.log("Missing the localstream");
        return;
      }

      if (peer) {
        peer.peerConnection.signal(connectionData.sdp);
        console.log("peer created return");
        return;
      }

      const newPeer = createPeer(localStream, true);

      setPeer({
        peerConnection: newPeer,
        partipantUser: connectionData.ongoingCall.participants.receiver,
        stream: undefined,
      });

      const signal = async (data: SignalData) => {
        if (socket) {
          console.log("emit offer");
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall: OngoingCall,
            isCaller: true,
          });
        }
      };
      newPeer.on("signal", signal);

      return () => {
        newPeer.off("signal", signal);
      };
    },
    [localStream, createPeer, peer, OngoingCall]
  );
  const { chat } = useChatId();

  useEffect(() => {
    socket?.on("receiveMessage", async (message: Message) => {
      console.log(chat);
      if (message.senderId === myId) return;
      if (chat && +chat === message.chatId) return;
      const sender = await getUserById(message.senderId);

      toast({
        title: `Пришло сообщение от пользователя ${sender?.name}`,
      });
    });

    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket, session, chat]);
  useEffect(() => {
    if (!socket || !socket.connected || !session) return;

    socket.on("incomingCall", onIncomingCallHandle);
    socket.on("webrtcSignalOn", completePeerConnection);

    return () => {
      socket.off("incomingCall", onIncomingCallHandle);
      socket.off("webrtcSignalOn", completePeerConnection);
    };
  }, [
    socket,
    isSocketConnected,
    session,
    completePeerConnection,
    onIncomingCallHandle,
  ]);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [session]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = async () => {
      setSocketIsConnected(true);
    };
    const onDisconnect = async () => {
      setSocketIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  //online users
  const getOnlineUsers = useCallback(
    (onlineUsers: SocketUser[]) => {
      setOnlineUsers(onlineUsers);
    },
    [setOnlineUsers]
  );

  useEffect(() => {
    if (!socket || !session) return;

    socket?.emit("newOnlineUser", session?.user);

    socket?.on("getOnlineUsers", getOnlineUsers);

    return () => {
      socket?.off("getOnlineUsers", getOnlineUsers);
    };
  }, [socket, session]);

  return (
    <SocketContext.Provider
      value={{
        handleJoinCall,
        socket,
        isSocketConnected,
        handleCall,
        localStream,
        OngoingCall,
        onlineUsers,
        peer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === null)
    throw new Error("useSocket must be used within a SocketContextProvider");

  return context;
};
