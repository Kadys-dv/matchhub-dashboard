import { z } from "zod";

const schema = z.object({
  MATCHHUB_API_URL: z.url().default("http://localhost:8080"),
});

export const env = schema.parse({
  MATCHHUB_API_URL: process.env.MATCHHUB_API_URL,
});
