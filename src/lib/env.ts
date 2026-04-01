import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const Env = createEnv({
  server: {
    FLAGSMITH_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
