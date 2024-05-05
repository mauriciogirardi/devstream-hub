import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    LIVEKIT_API_URL: z.string().url(),
    LIVEKIT_API_KEY: z.string(),
    LIVEKIT_API_SECRET: z.string(),
    NODE_ENV: z
      .enum(['test', 'development', 'production'])
      .default('development'),
  },

  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_LIVEKIT_API_URL: z.string().url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    LIVEKIT_API_URL: process.env.LIVEKIT_API_URL,
    LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY,
    LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET,
    NEXT_PUBLIC_LIVEKIT_API_URL: process.env.NEXT_PUBLIC_LIVEKIT_API_URL,
  },
})
