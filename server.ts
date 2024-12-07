import { createServer } from "http";
import next from "next";
import { initSocketServer } from "./src/app/api/socket/route";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  initSocketServer(server);

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on ", process.env.NEXTAUTH_URL);
  });
});
