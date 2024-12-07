import { NextApiRequest, NextApiResponse } from "next";
import { Server as HttpServer } from "http";
import { Socket as NetSocket } from "net";
import { Server as SocketIOServer } from "socket.io";

interface CustomSocket extends NetSocket {
  server: HttpServer & {
    io?: SocketIOServer;
  };
}

interface CustomNextApiResponse extends NextApiResponse {
  socket: CustomSocket;
}

export default function handler(
  req: NextApiRequest,
  res: CustomNextApiResponse
) {
  if (!res.socket.server.io) {
    console.log("Инициализация Socket.IO...");
    const io = new SocketIOServer(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Новое соединение:", socket.id);

      socket.on("message", (msg) => {
        console.log("Получено сообщение:", msg);
        socket.emit("response", `Сообщение получено: ${msg}`);
      });

      socket.on("disconnect", () => {
        console.log("Пользователь отключился");
      });
    });
  } else {
    console.log("Socket.IO уже инициализирован.");
  }

  res.end();
}
