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

  io.on("connection", (socket) => {});

  io.on("sendMessage", async ({ chatId, senderId, content }) => {
    const message = await dbClient.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
    });

    io.to(chatId).emit("receiveMessage", message);
  });

  io.on("joinChat", (chatId) => {
    io.join(chatId);
    console.log(`User joined chat ${chatId}`);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on ${process.env.NEXTAUTH_URL}`);
    });
});
