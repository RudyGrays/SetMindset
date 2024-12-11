import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface iSocketContext {
  socket: Socket | null;
  socketIsConnected: boolean;
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketIsConnected, setSocketIsConnected] = useState<boolean>(false);

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

  return (
    <SocketContext.Provider value={{ socket, socketIsConnected }}>
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
