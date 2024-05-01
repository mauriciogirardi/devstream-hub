import { db } from './db'

export async function getStreamByUserId({ userId }: { userId: string }) {
  const stream = await db.stream.findUnique({
    where: { userId },
  })

  return stream
}
