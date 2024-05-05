'use client'

import { Stream, User } from '@prisma/client'

import { useSidebar } from '@/store/use-sidebar'

import { UserItem, UserItemSkeleton } from '../user-item'

type RecommendedProps = {
  data: (User & { stream: Stream | null })[]
}

export function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar((state) => state)
  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem key={user.id} user={user} isLive={user?.stream?.isLive} />
        ))}
      </ul>
    </div>
  )
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
