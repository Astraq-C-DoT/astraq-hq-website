import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    DATABASE_AUTH_TOKEN: z.string(),
    PAYLOAD_SECRET: z.string(),
    PAYLOAD_REVALIDATE_SECRET: z.string(),
    TURNSTILE_SECRET_KEY: z.string(),
    BLOB_READ_WRITE_TOKEN: z.string(),
    RESEND_API_KEY: z.string(),
    APP_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_REVALIDATE_SECRET: process.env.PAYLOAD_REVALIDATE_SECRET,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    APP_URL: process.env.APP_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
