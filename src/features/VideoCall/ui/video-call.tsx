"use client";

import { useRef, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

type SignalData = {
  type: "offer" | "answer" | "ice-candidate";
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
};

type SignalEvent = {
  signal: SignalData;
  senderId: string;
};

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [isInitiator, setIsInitiator] = useState<boolean>(false);

  const iceServers: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    const socketInstance = io("/", { path: "/api/socket" });
    setSocket(socketInstance);

    socketInstance.on("signal", async (data: SignalEvent) => {
      const { signal } = data;

      if (signal.type === "offer" && signal.offer) {
        await handleOffer(signal.offer);
      } else if (signal.type === "answer" && signal.answer) {
        await handleAnswer(signal.answer);
      } else if (signal.type === "ice-candidate" && signal.candidate) {
        await handleICECandidate(signal.candidate);
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (roomId && socket) {
      socket.emit("join-room", roomId);
      setIsInitiator(true);
      startCall();
    }
  };

  const startCall = async () => {
    if (!socket) return;

    const pc = new RTCPeerConnection(iceServers);
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", {
          roomId,
          signal: { type: "ice-candidate", candidate: event.candidate },
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream));

      if (isInitiator) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("signal", { roomId, signal: { type: "offer", offer } });
      }

      setPeerConnection(pc);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    const pc = new RTCPeerConnection(iceServers);
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("signal", {
          roomId,
          signal: { type: "ice-candidate", candidate: event.candidate },
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream));

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket?.emit("signal", { roomId, signal: { type: "answer", answer } });
    } catch (err) {
      console.error("Error handling offer:", err);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      await peerConnection?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (err) {
      console.error("Error handling answer:", err);
    }
  };

  const handleICECandidate = async (candidate: RTCIceCandidateInit) => {
    try {
      await peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("Error adding ICE candidate:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default VideoCall;
