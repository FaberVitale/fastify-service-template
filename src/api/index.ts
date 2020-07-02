import { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import compress from "fastify-compress";
import etag from "fastify-etag";
import timestamp from "./services/timestamp";

export default function api(
  fastify: FastifyInstance,
  options: Record<string, unknown>,
  next: () => void
): void {
  fastify.register(cors);
  fastify.register(compress);
  fastify.register(etag);

  fastify.setErrorHandler(function handleError(error, request, reply) {
    if (error.validation) {
      reply.status(422).send(error);
    }
  });

  fastify.register(timestamp, {
    prefix: "/now",
    swagger: process.env.NODE_ENV !== "production",
  });

  next();
}
