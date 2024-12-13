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
interface iSocketContext {
  socket: Socket | null;
  isSocketConnected: boolean;
  handleCall: (receiver: SocketUser) => void;
  onlineUsers?: SocketUser[];
  localStream?: MediaStream;
  handleJoinCall: (call: Call) => void;
  call?: Call;
  peer?: PeerData;
}
export interface SocketUser {
  userId: string;
  socketId: string;
  profile: UserEntity;
}
export interface Call {
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setSocketIsConnected] = useState<boolean>(false);
  const [peer, setPeer] = useState<PeerData>();

  const router = useRouter();

  const myId = session?.user.id;
  //onlineUsers
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);
  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === myId
  );
  console.log(onlineUsers);

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
  const [call, setCall] = useState<Call>();

  const handleJoinCall = useCallback(
    async (call: Call) => {
      setCall((prev) => {
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

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          console.log("emit offer");
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall: call,
            isCaller: false,
          });
        }
      });

      router.push(`/video-call/${call.participants.caller.userId}`);
    },
    [socket, currentSocketUser]
  );

  const handleCall = useCallback(
    async (receiver: SocketUser) => {
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

      setCall({ participants, isRinging: false });
      socket?.emit("call", participants);
    },
    [socket, currentSocketUser, call]
  );

  const handleHangup = useCallback(({}) => {}, []);

  const onIncomingCallHandle = useCallback(
    (participants: Participants) => {
      setCall({
        participants,
        isRinging: true,
      });
    },
    [socket, currentSocketUser, call]
  );

  //peer

  const createPeer = useCallback(
    (stream: MediaStream, initiator: boolean) => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun.l.google.com:5349",
            "stun:stun1.l.google.com:3478",
            "stun:stun1.l.google.com:5349",
            "stun:stun2.l.google.com:19302",
            "stun:stun2.l.google.com:5349",
            "stun:stun3.l.google.com:3478",
            "stun:stun3.l.google.com:5349",
            "stun:stun4.l.google.com:19302",
            "stun:stun4.l.google.com:5349",
          ],
        },
      ];

      const peer = new Peer({
        stream,
        initiator,
        trickle: true,
        config: { iceServers },
      });

      peer.on("signal", (data: SignalData) => {
        setPeer((prevPeer) => {
          if (prevPeer) {
            return { ...prevPeer, stream };
          }
          return prevPeer;
        });

        // Emit signal to the server
        if (socket) {
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall: call,
            isCaller: initiator,
          });
        }
      });

      peer.on("connect", () => {
        console.log("Peer connection established.");
        // You can handle actions after the connection is established
      });

      peer.on("close", () => {
        console.log("Peer connection closed.");
        // You can handle cleanup actions when the connection is closed
      });

      peer.on("error", (error) => {
        console.error("Error in peer connection:", error);
        // You can handle error events here
      });

      return peer;
    },
    [call, setPeer, socket]
  );

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData;
      ongoingCall: Call;
      isCaller: boolean;
    }) => {
      if (!localStream) {
        console.log("Missing the localstream");
        return;
      }

      if (peer) {
        peer.peerConnection.signal(connectionData.sdp);
        return;
      }

      const newPeer = createPeer(localStream, true);

      setPeer({
        peerConnection: newPeer,
        partipantUser: connectionData.ongoingCall.participants.receiver,
        stream: undefined,
      });

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall: call,
            isCaller: true,
          });
        }
      });
    },
    [localStream, createPeer, peer, call]
  );

  useEffect(() => {
    if (!socket || !socket.connected || !session) return;

    socket.on("incomingCall", onIncomingCallHandle);
    socket.on("webrtcSignal", completePeerConnection);

    return () => {
      socket.off("incomingCall", onIncomingCallHandle);
      socket.off("webrtcSignal", completePeerConnection);
    };
  }, [
    socket,
    isSocketConnected,
    session,
    completePeerConnection,
    onIncomingCallHandle,
  ]);

  useEffect(() => {
    if (status === "loading" || !session) {
      return;
    }

    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [status, session]);

  useEffect(() => {
    if (socket === null) return;

    const onConnect = () => setSocketIsConnected(true);
    const onDisconnect = () => {
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
      setOnlineUsers((prev) => [
        ...onlineUsers.filter((user) => user.userId !== myId),
      ]);
    },
    [setOnlineUsers]
  );

  useEffect(() => {
    if (!socket || !socket.connected || !session) return;

    socket?.emit("newOnlineUser", session?.user);

    socket?.on("getOnlineUsers", getOnlineUsers);

    return () => {
      socket?.off("getOnlineUsers", getOnlineUsers);
    };
  }, [socket, session, socket?.connected]);

  return (
    <SocketContext.Provider
      value={{
        handleJoinCall,
        socket,
        isSocketConnected,
        handleCall,
        localStream,
        call,
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
