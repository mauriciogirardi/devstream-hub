'use server'

import { revalidatePath } from 'next/cache'

import { PATH_HOME } from '@/constants/paths'
import { followUser, unFollowUser } from '@/lib/follow-service'

export async function onFollow(userId: string) {
  try {
    const followedUser = await followUser({ userId })

    revalidatePath(PATH_HOME)

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser
  } catch (error) {
    console.error(error)
    throw new Error('Internal Error!')
  }
}

export async function onUnfollow(userId: string) {
  try {
    const unFollowedUser = await unFollowUser({ userId })

    revalidatePath(PATH_HOME)

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`)
    }

    return unFollowedUser
  } catch (error) {
    console.error(error)
    throw new Error('Internal Error!')
  }
}
