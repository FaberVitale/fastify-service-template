import app from "./app";
import { once } from "lodash";
import { port, host } from "./config";
import { FastifyInstance } from "fastify";

function createGracefulshutdown(server: FastifyInstance, timeoutMs = 5_000) {
  function gracefulShutdown() {
    console.log("graceful shutdown started");

    server.close(() => {
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

app.listen(port, host, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server started at ${host}:${port}`);
});

const gracefulShutdown = createGracefulshutdown(app);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("unhandledRejection", function unhandledRejection(err) {
  console.error("unhandledRejection\n", err);
  process.exit(1);
});
