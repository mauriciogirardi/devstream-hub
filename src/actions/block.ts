'use server'

import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

import { PATH_HOME } from '@/constants/paths'
import { env } from '@/env'
import { getSelf } from '@/lib/auth-service'
import { blockUser, unblockUser } from '@/lib/block-service'

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
  const unblockedUser = await unblockUser({ userId })

  revalidatePath(PATH_HOME)

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`)
  }

  return unblockedUser
}
