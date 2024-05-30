'use server'

import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

import { env } from '@/env'
import { getSelf } from '@/lib/auth-service'
import { blockUser, unblockUser } from '@/lib/block-service'
import { db } from '@/lib/db'

const roomService = new RoomServiceClient(
  env.LIVEKIT_API_URL,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
)

export async function onBlock(userId: string) {
  const self = await getSelf()

  let blockedUser

  try {
    blockedUser = await blockUser({ userId })
  } catch {
    // This means user
  }

  try {
    await roomService.removeParticipant(self.id, userId)
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self.username}/community`)

  return blockedUser
}

export async function onUnblock(userId: string) {
  const self = await getSelf()
  const unblockedUser = await unblockUser({ userId })
  revalidatePath(`/u/${self.username}/community`)
  return unblockedUser
}

export async function getBlockedUsers() {
  const self = await getSelf()

  const blockedUsers = await db.block.findMany({
    where: {
      blockedId: self.id,
    },
    include: {
      blocked: true,
    },
  })

  return blockedUsers
}
