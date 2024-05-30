'use client'

import { User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { Thumbnail, ThumbnailSkeleton } from '../thumbnail'
import { Skeleton } from '../ui/skeleton'
import { VerifiedMark } from '../verified-mark'

type ResultCardProps = {
  data: {
    user: User
    isLive: boolean
    thumbnailUrl: string | null
    updatedAt: Date
    name: string
  }
}

export function ResultsSearch({ data }: ResultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="cursor-pointer text-lg font-bold hover:text-purple-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>

          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function ResultsSearchSkeleton() {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}
