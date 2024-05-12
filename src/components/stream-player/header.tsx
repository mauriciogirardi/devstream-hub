'use client'

import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react'
import { UserIcon } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'
import { UserAvatar } from '../user-avatar'
import { VerifiedMark } from '../verified-mark'
import { Actions, ActionsSkeleton } from './actions'

type HeaderProps = {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}

export function Header({
  hostIdentity,
  hostName,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: HeaderProps) {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant
  const participantCount = participants.length - 1
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          userAvatar={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge={isLive}
        />

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>

          <p className="text-sm font-semibold">{name}</p>

          {isLive ? (
            <div className="flex items-center gap-x-1 text-sm font-semibold text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount}{' '}
                {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>

      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <Skeleton className="size-14 rounded-full" />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="size-6 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  )
}
