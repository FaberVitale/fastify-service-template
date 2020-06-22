import { FastifyInstance } from "fastify";
import {
  response,
  SuccessResponse,
  querystringSchema,
  Querystring,
} from "./schema";

export default function now(
  fastify: FastifyInstance,
  option: { prefix: string },
  next: () => void
): void {
  fastify.route<Querystring>({
    url: "/",
    method: ["GET", "HEAD"],
    schema: {
      tags: ["timestamp"],
      querystring: querystringSchema,
      response,
    },
    handler: async function handleNow(
      request,
      reply
    ): Promise<SuccessResponse> {
      let now: string;

      switch (request.query.format) {
        case "http-date":
          now = new Date().toUTCString();
          break;
        default:
          now = new Date().toISOString();
      }

      reply.header("cache-control", "no-store");

      return { now };
    },
  });

  next();
}
