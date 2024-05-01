'use server'

import { revalidatePath } from 'next/cache'

import { PATH_HOME } from '@/constants/paths'
import { blockUser, unblockUser } from '@/lib/block-service'

export async function onBlock(userId: string) {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow ability to kick the guest

  const blockedUser = await blockUser({ userId })

  revalidatePath(PATH_HOME)

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`)
  }

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
