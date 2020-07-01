import fastify from "fastify";
import morgan from "morgan";
import ajvErrors from "ajv-errors";
import api from "../api";

const app = fastify({
  ajv: {
    customOptions: { allErrors: true, jsonPointers: true },
    plugins: [ajvErrors],
  },
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.register(api, { prefix: "/api" });

export default app;
