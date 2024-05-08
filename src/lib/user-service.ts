import { db } from './db'

export async function getUserByUsername({ username }: { username: string }) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
    },
  })

  return user
}

export async function getUserById({ userId }: { userId: string }) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      stream: true,
    },
  })

  return user
}
