import fastify from "fastify";
import ajvErrors from "ajv-errors";
import api from "../api";

const app = fastify({
  logger: { level: "info" },
  ajv: {
    customOptions: { allErrors: true, jsonPointers: true },
    plugins: [ajvErrors],
  },
});

app.register(api, { prefix: "/api" });

export default app;
