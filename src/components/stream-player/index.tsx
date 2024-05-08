'use client'

import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

import { env } from '@/env'
import { useViewerToken } from '@/hooks/use-viewer-token'

import { Video } from './video'

type StreamPlayerProps = {
  user: User
  stream: Stream
  isFollowing: boolean
}

export function StreamPlayer({ isFollowing, stream, user }: StreamPlayerProps) {
  const { identity, name, token } = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return (
      <div>
        <h2>Cannot watch the stream</h2>
      </div>
    )
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={env.NEXT_PUBLIC_LIVEKIT_API_URL}
        className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  )
}
