import { User } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

import { LiveBadge } from './live-badge'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { UserAvatar } from './user-avatar'

type UserItemProps = {
  user: User
  isLive?: boolean
}

export function UserItem({ user, isLive = false }: UserItemProps) {
  const pathname = usePathname()
  const { collapsed } = useSidebar((state) => state)

  const href = `/${user.username}`
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'h-12 w-full',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent',
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            'flex w-full items-center gap-x-4',
            collapsed && 'justify-center',
          )}
        >
          <UserAvatar
            username={user.username}
            userAvatar={user.imageUrl}
            isLive={isLive}
          />
          {!collapsed && <p className="truncate">{user.username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  )
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4" />
      </div>
    </li>
  )
}
