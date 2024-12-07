import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST_NAME;
const port = Number(process.env.HOST_PORT);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
if (isNaN(port) || port <= 0 || port > 65535) {
  console.error("Неверный порт: должен быть числом от 1 до 65535.");
  process.exit(1);
}
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
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
