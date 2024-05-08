'use server'

import { AccessToken } from 'livekit-server-sdk'
import { v4 } from 'uuid'

import { env } from '@/env'
import { getSelf } from '@/lib/auth-service'
import { isBlockedByUser } from '@/lib/block-service'
import { getUserById } from '@/lib/user-service'

export async function createViewerToken(hostIdentity: string) {
  let self

  try {
    self = await getSelf()
  } catch {
    const id = v4()
    const username = `guest#${Math.floor(Math.random() * 1000)}`
    self = {
      id,
      username,
    }
  }

  const host = await getUserById({ userId: hostIdentity })

  if (!host) {
    throw new Error('User not found!')
  }

  const isBlocked = await isBlockedByUser({ userId: host.id })

  if (isBlocked) {
    throw new Error('User is blocked!')
  }

  const isHost = self.id === host.id

  const token = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: isHost ? `host-${self.id}` : self.id,
    name: self.username,
  })

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  })

  return await Promise.resolve(token.toJwt())
}
