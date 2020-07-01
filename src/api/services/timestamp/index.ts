import { FastifyInstance } from "fastify";
import acceptsSerializer from "fastify-accepts-serializer";
import {
  response,
  SuccessResponse,
  querystringSchema,
  Querystring,
} from "./schema";
import swagger from "fastify-swagger";

export default function now(
  fastify: FastifyInstance,
  option: { prefix?: string; swagger?: boolean },
  next: () => void
): void {
  const opt = Object.assign({ swagger: true }, option);

  if (opt.swagger) {
    fastify.register(swagger, {
      swagger: {
        info: {
          title: "timestamp service",
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
        produces: ["application/json", "text/html", "text/plain"],
        tags: [{ name: "timestamp", description: "time" }],
      },
      exposeRoute: true,
    });
  }

  fastify.register(acceptsSerializer, {
    serializers: [
      {
        regex: /^text\/html$/,
        serializer: function nowHtmlSerializer({ now }: SuccessResponse) {
          return `<p style="padding: 1rem;">time is: <strong>${now}</strong></p>`;
        },
      },
      {
        regex: /^text\/plain$/,
        serializer: function ({ now }: SuccessResponse) {
          return now;
        },
      },
    ],
  });

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
