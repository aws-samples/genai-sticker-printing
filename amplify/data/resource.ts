import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

export const MODEL_ID = "stability.stable-image-core-v1:0";

export const generateImageFunction = defineFunction({
  entry: "./generateImage.ts",
  timeoutSeconds: 60,
  environment: {
    MODEL_ID,
  },
});

const schema = a.schema({
  generateImage: a
    .query()
    .arguments({ prompt: a.string().required() })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(generateImageFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema
});