'use client'

import { Skeleton } from '../ui/skeleton'
import { VerifiedMark } from '../verified-mark'
import { BioModel } from './bio-model'

type AboutCardProps = {
  hostName: string
  hostIdentity: string
  bio: string | null
  viewerIdentity: string | null
  followedByCount: number
}

export function AboutCard({
  hostIdentity,
  hostName,
  bio,
  viewerIdentity,
  followedByCount,
}: AboutCardProps) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer
  const followedByLabel = followedByCount <= 1 ? 'follower' : 'followers'

  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-[#22252e] p-6 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-lg font-semibold lg:text-2xl">
              About {hostName}
            </span>
            <VerifiedMark />
          </div>

          {isHost && <BioModel initialValue={bio} />}
        </div>

        <span className="text-sm font-semibold text-primary">
          {followedByCount}{' '}
          <span className="text-muted-foreground">{followedByLabel}</span>
        </span>

        <p className="text-sm">
          {bio || 'This user prefers to keep an air mystery about them.'}
        </p>
      </div>
    </div>
  )
}

export function AboutCardSkeleton() {
  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-[#22252e] p-6 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-5 w-36 lg:h-7" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="ml-auto h-5 w-14" />
        </div>
        <Skeleton className="mt-2 h-5 w-24" />
        <Skeleton className="h-5 w-56" />
      </div>
    </div>
  )
}
