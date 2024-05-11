'use client'

import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

import { env } from '@/env'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { cn } from '@/lib/utils'
import { userChatSidebar } from '@/store/user-chat-sidebar'

import { Chat, ChatSkeleton } from '../chat'
import { ChatToggle } from '../chat/chat-toggle'
import { Video, VideoSkeleton } from './video'

type StreamPlayerProps = {
  user: User
  stream: Stream
  isFollowing: boolean
}

export function StreamPlayer({ isFollowing, stream, user }: StreamPlayerProps) {
  const { identity, name, token } = useViewerToken(user.id)
  const { collapsed } = userChatSidebar((state) => state)

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        token={token}
        serverUrl={env.NEXT_PUBLIC_LIVEKIT_API_URL}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          collapsed &&
            'h-[calc(100vh_-_80px)] lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>

        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export function StreamPlayerSkeleton() {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <VideoSkeleton />
      </div>

      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  )
}
