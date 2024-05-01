import { getSelf } from './auth-service'
import { db } from './db'

export async function getFollowedUsers() {
  try {
    const self = await getSelf()

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: true,
      },
    })

    return followedUsers
  } catch {
    return []
  }
}

export async function isFollowingUser({ userId }: { userId: string }) {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!otherUser) {
      throw new Error('User not found!')
    }

    if (otherUser.id === self.id) {
      return true
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    })

    return !!existingFollow
  } catch {
    return false
  }
}

export async function followUser({ userId }: { userId: string }) {
  const self = await getSelf()
  const otherUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!otherUser) {
    throw new Error('User not found!')
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot follow yourself!')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  })

  if (existingFollow) {
    throw new Error('Already following!')
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  })

  return follow
}

export async function unFollowUser({ userId }: { userId: string }) {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!otherUser) {
    throw new Error('User not found!')
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot unFollow yourself!')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  })

  if (!existingFollow) {
    throw new Error('Not following!')
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  })

  return follow
}
