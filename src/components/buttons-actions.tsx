'use client'

import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onBlock, onUnblock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'

import { Button } from './ui/button'

type FollowActionsProps = {
  isFollowing: boolean
  isBlocked: boolean
  userId: string
}

export function ButtonsActions({
  isFollowing,
  isBlocked,
  userId,
}: FollowActionsProps) {
  const [isPendingFollow, startTransitionFollow] = useTransition()
  const [isPendingBlock, startTransitionBlock] = useTransition()

  const handleFollow = () => {
    startTransitionFollow(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`)
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
    })
  }

  const handleUnfollow = () => {
    startTransitionFollow(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`)
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
    })
  }

  const handleBlock = () => {
    startTransitionBlock(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data?.blocked.username}!`),
        )
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const handleUnblock = () => {
    startTransitionBlock(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`Unblocked the user ${data.blocked.username}!`),
        )
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const handleFollowOrUnfollow = () => {
    isFollowing ? handleUnfollow() : handleFollow()
  }

  const handleBlockAndUnblock = () => {
    isBlocked ? handleUnblock() : handleBlock()
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleFollowOrUnfollow}
        disabled={isPendingFollow || isPendingBlock}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
        {isPendingFollow && <Loader2 className="ml-2 size-5 animate-spin" />}
      </Button>

      <Button
        onClick={handleBlockAndUnblock}
        disabled={isPendingFollow || isPendingBlock}
      >
        {isBlocked ? 'Unblock' : 'Block'}
        {isPendingBlock && <Loader2 className="ml-2 size-5 animate-spin" />}
      </Button>
    </>
  )
}
