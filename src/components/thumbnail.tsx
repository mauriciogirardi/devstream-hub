import Image from 'next/image'

import { Skeleton } from './ui/skeleton'
import { UserAvatar } from './user-avatar'

type ThumbnailProps = {
  src: string | null
  fallback: string
  isLive: boolean
  username: string
}

export function Thumbnail({ fallback, isLive, src, username }: ThumbnailProps) {
  let content

  if (!src) {
    content = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-[#22252e] transition-transform group-hover:-translate-y-1 group-hover:translate-x-2">
        <UserAvatar
          username={username}
          size="lg"
          showBadge
          userAvatar={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="rounded-md object-cover transition-transform group-hover:-translate-y-1 group-hover:translate-x-2"
      />
    )
  }

  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
      {content}
    </div>
  )
}

export function ThumbnailSkeleton() {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
