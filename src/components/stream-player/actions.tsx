'use client'

import { useAuth } from '@clerk/nextjs'
import { Heart, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onFollow, onUnfollow } from '@/actions/follow'
import { PATH_SIGN_IN } from '@/constants/paths'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

type ActionsProps = {
  isFollowing: boolean
  hostIdentity: string
  isHost: boolean
}

export function Actions({ hostIdentity, isFollowing, isHost }: ActionsProps) {
  const { userId } = useAuth()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleFollow = () =>
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch(() => toast.error('Something went wrong!'))
    })

  const handleUnfollow = () =>
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`),
        )
        .catch(() => toast.error('Something went wrong!'))
    })

  const handleToggleFollow = () => {
    if (!userId) {
      return router.push(PATH_SIGN_IN)
    }

    if (isHost) return

    isFollowing ? handleUnfollow() : handleFollow()
  }

  return (
    <Button
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
      onClick={handleToggleFollow}
      disabled={isPending || isHost}
    >
      <Heart
        className={cn('mr-2 size-4', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
      {isPending && <Loader2 className="size-4 animate-spin" />}
    </Button>
  )
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />
}
