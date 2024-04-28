/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

declare global {
  namespace globalThis {
    var prismaDb: PrismaClient
  }
}
