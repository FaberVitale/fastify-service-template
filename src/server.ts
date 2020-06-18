import { createServer, Server } from "http";
import app from "./app";
import { once } from "lodash";
import { port } from "./config";

function createGracefulshutdown(server: Server, timeoutMs = 5_000) {
  function gracefulShutdown() {
    console.log("graceful shutdown started");

    server.close((err) => {
      if (err) {
        console.error(err);
      }

      setImmediate(() => {
        process.exit(0);
      });
    });

    // @see https://nodejs.org/api/http.html#http_server_keepalivetimeout
    setTimeout(() => {
      process.exit(0);
    }, timeoutMs);
  }

  return once(gracefulShutdown);
}

const server = createServer(app).listen(port, () => {
  console.log(`Server started at ${port}`);
});

const gracefulShutdown = createGracefulshutdown(server);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
