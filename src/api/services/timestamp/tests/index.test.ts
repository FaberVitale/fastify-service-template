import timestamp from "../";
import { camelCase } from "lodash";
import fastify from "fastify";
import { PromiseType } from "utility-types";
import { InjectOptions as HTTPInjectOptions } from "light-my-request";

async function setupServer() {
  const app = fastify();

  await app.register(timestamp, { prefix: "/now", swagger: false });

  return app;
}

describe("timestamp service", () => {
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

  let app: PromiseType<ReturnType<typeof setupServer>>;

  beforeAll((done) => {
    setupServer().then((setupApp) => {
      app = setupApp;
      done();
    }, done);
  });

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
      try {
        const res = await app.inject(req);

        expect(res.statusCode).toBe(expected.statusCode);

        if (expected.headers) {
          const camelCaseHeaders = Object.fromEntries(
            Object.entries(res.headers).map(([key, val]) => [
              camelCase(key),
              val,
            ])
          );

          for (const [field, value] of Object.entries(expected.headers)) {
            expect(camelCaseHeaders[field]).toMatch(value);
          }
        }
      } catch (fastifyError) {
        console.error(fastify);

        const error: Error & { fastifyError?: unknown } = new Error(
          fastifyError.message || "err"
        );

        error.fastifyError = fastifyError;

        throw error;
      }
    }
  );
});
