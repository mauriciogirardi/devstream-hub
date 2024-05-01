import { getSelf } from './auth-service'
import { db } from './db'

export async function isBlockedByUser({ userId }: { userId: string }) {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: { id: userId },
    })

    if (!otherUser) {
      throw new Error('User not found!')
    }

    if (otherUser.id === self.id) {
      return false
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    })

    return !!existingBlock
  } catch {
    return false
  }
}

export async function blockUser({ userId }: { userId: string }) {
  const self = await getSelf()

  if (self.id === userId) {
    throw new Error('Cannot block yourself!')
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  })

  if (!otherUser) {
    throw new Error('User not found!')
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  })

  if (existingBlock) {
    throw new Error('Already blocked!')
  }

  const block = await db.block.create({
    data: {
      blockedId: otherUser.id,
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  })

  return block
}

export async function unblockUser({ userId }: { userId: string }) {
  const self = await getSelf()

  if (self.id === userId) {
    throw new Error('Cannot unblock yourself!')
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  })

  if (!otherUser) {
    throw new Error('User not found!')
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  })

  if (!existingBlock) {
    throw new Error('Not blocked!')
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  })

  return unblock
}
