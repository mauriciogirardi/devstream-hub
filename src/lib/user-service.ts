import { db } from './db'

export async function getUserByUsername({ username }: { username: string }) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
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
