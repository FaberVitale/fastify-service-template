import { Type, Static } from "@sinclair/typebox";

export const successResponse = Type.Object({
  now: Type.String(),
});

export const response = {
  200: successResponse,
};

const supportedFormats = ["iso", "http-date"];

export const querystringSchema = Type.Object({
  format: Type.Optional(
    Type.String({
      enum: supportedFormats,
      description: "timestamp format",
      errorMessage: {
        enum: `format should be one of ${supportedFormats.join(", ")}`,
      },
    })
  ),
});

export type Querystring = Static<typeof querystringSchema>;

export type SuccessResponse = Static<typeof successResponse>;
