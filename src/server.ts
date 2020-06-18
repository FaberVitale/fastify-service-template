import { createServer, Server } from "http";
import app from "./app";
import { port } from "./config";

function createGracefulshutdown(server: Server) {
  return function gracefulShutdown() {
    console.log("graceful shutdown started");

    server.close(() => {
      process.exit(0);
    });

    // @see https://nodejs.org/api/http.html#http_server_keepalivetimeout
    setTimeout(() => {
      process.exit(0);
    }, 6_000);
  };
}

const server = createServer(app).listen(port, () => {
  console.log(`Server started at ${port}`);
});

const gracefulShutdown = createGracefulshutdown(server);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
