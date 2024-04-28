import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { LiveBadge } from './live-badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'size-8',
      lg: 'size-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type UserAvatarProps = VariantProps<typeof avatarSizes> & {
  username: string
  userAvatar: string
  isLive?: boolean
  showBadge?: boolean
}

export function UserAvatar({
  isLive,
  userAvatar,
  username,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'border border-background ring-2 ring-rose-500',
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={userAvatar} className="object-cover" />
        <AvatarFallback className="uppercase">
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>
export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
