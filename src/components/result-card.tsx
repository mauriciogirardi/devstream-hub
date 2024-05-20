'use client'

import { User } from '@prisma/client'
import Link from 'next/link'

import { Thumbnail, ThumbnailSkeleton } from './thumbnail'
import { Skeleton } from './ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from './user-avatar'

type ResultCardProps = {
  data: {
    user: User
    isLive: boolean
    thumbnailUrl: string | null
    name: string
  }
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />

        <div className="flex gap-x-3">
          <UserAvatar
            userAvatar={data.user.imageUrl}
            username={data.user.username}
            isLive={data.isLive}
          />

          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold hover:via-violet-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
