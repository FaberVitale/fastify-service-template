import { FastifyInstance } from "fastify";
import * as cors from "fastify-cors";
import * as compress from "fastify-compress";
import * as etag from "fastify-etag";
import * as swagger from "fastify-swagger";
import timestamp from "./services/timestamp";

export default function api(
  fastify: FastifyInstance,
  options: Record<string, unknown>,
  next: () => void
): void {
  fastify.register(cors);
  fastify.register(compress);
  fastify.register(etag);
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "Test swagger",
        description: "testing the fastify swagger api",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost:5000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "timestamp", description: "time" }],
    },
    exposeRoute: true,
  });

  fastify.setErrorHandler(function handleError(error, request, reply) {
    if (error.validation) {
      reply.status(422).send(error);
    }
  });

  fastify.register(timestamp, { prefix: "/now" });

  next();
}
