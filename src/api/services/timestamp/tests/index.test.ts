import timestamp from "../";
import { camelCase } from "lodash";
import fastify, { HTTPInjectOptions } from "fastify";

function setupServer() {
  const app = fastify();

  app.register(timestamp, { prefix: "/now", swagger: false });

  return app;
}

describe("timestamp service", () => {
  const app = setupServer();

  const expectSuccess = {
    statusCode: 200,
    headers: {
      cacheControl: "no-store",
      contentType: "application/json",
    },
  };

  const expectInvalidArg = {
    statusCode: 400,
  };

  it.each([
    [{ method: "GET", url: "/now", query: {} }, expectSuccess],
    [{ method: "GET", url: "/now", query: { format: "iso" } }, expectSuccess],
    [
      { method: "GET", url: "/now", query: { format: "http-date" } },
      expectSuccess,
    ],
    [
      { method: "GET", url: "/now", query: { format: "not-supported" } },
      expectInvalidArg,
    ],
    [
      {
        method: "GET",
        url: "/now",
        headers: { accept: "text/html; charset=utf-8" },
      },
      {
        statusCode: 200,
        headers: {
          cacheControl: "no-store",
          contentType: "text/html",
        },
      },
    ],
    [
      {
        method: "GET",
        url: "/now",
        headers: { accept: "text/plain; charset=utf-8" },
      },
      {
        statusCode: 200,
        headers: {
          cacheControl: "no-store",
          contentType: "text/plain",
        },
      },
    ],
  ] as [HTTPInjectOptions, Record<string, unknown>][])(
    "%# - %j request",
    async (req: HTTPInjectOptions, expected) => {
      const res = await app.inject(req);

      expect(res.statusCode).toBe(expected.statusCode);

      if (expected.headers) {
        const camelCaseHeaders = Object.fromEntries(
          Object.entries(res.headers).map(([key, val]) => [camelCase(key), val])
        );

        for (const [field, value] of Object.entries(expected.headers)) {
          expect(camelCaseHeaders[field]).toMatch(value);
        }
      }
    }
  );
});
