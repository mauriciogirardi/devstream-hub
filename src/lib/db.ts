import { PrismaClient } from '@prisma/client'

import { env } from '@/env'

export const db = globalThis.prismaDb || new PrismaClient()

if (env.NODE_ENV !== 'production') globalThis.prismaDb = db
