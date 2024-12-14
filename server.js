import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST_NAME;
const port = parseInt(process.env.HOST_PORT, 10) || 3000;

const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();
if (isNaN(port) || port <= 0 || port > 65535) {
  console.error("Неверный порт: должен быть числом от 1 до 65535.", port);
  process.exit(1);
}

app.prepare().then(async () => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let onlineUsers = [];

  io.on("connection", (socket) => {
    socket.on("joinToNotifications", (userId) => {
      const notificationsId = `notifications-${userId}`;
      socket.join(notificationsId);
    });

    socket.on("sendNotification", (notification) => {
      const { userId, message } = notification;
      const notificationsId = `notifications-${userId}`;

      io.to(notificationsId).emit("addNotification", notification);
    });

    socket.on("joinChat", (chatId, userId) => {
      socket.join(chatId);

      socket.emit("chatJoined", `You have joined chat ${chatId}`);
    });

    socket.on("sendMessage", (chatId, message) => {
      io.to(chatId).emit("receiveMessage", message);
    });

    socket.on("newOnlineUser", async (newUser) => {
      if (!onlineUsers.some((user) => user.userId === newUser.id)) {
        onlineUsers.push({
          userId: newUser.id,
          socketId: socket.id,
          profile: newUser,
        });
      }
      console.log("currentOnlineUsers", onlineUsers);
      socket.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("call", (participants) => {
      console.log(
        "Incoming call from",
        participants.caller.userId,
        "to",
        participants.receiver.userId
      );
      if (participants.receiver.socketId) {
        io.to(participants.receiver.socketId).emit(
          "incomingCall",
          participants
        );
      }
    });

    socket.on("webrtcSignal", (data) => {
      console.log("Received WebRTC signal:", data);
      const { isCaller, ongoingCall } = data;

      if (isCaller) {
        if (ongoingCall.participants.receiver.socketId) {
          io.to(ongoingCall.participants.receiver.socketId).emit(
            "webrtcSignalOn",
            data
          );
        }
      } else {
        if (ongoingCall.participants.caller.socketId) {
          io.to(ongoingCall.participants.caller.socketId).emit(
            "webrtcSignalOn",
            data
          );
        }
      }
    });
  });
  io.on("disconnect", async (socket) => {});
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on ${process.env.NEXTAUTH_URL}`);
    });
});
