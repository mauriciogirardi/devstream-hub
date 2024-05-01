'use client'

import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onFollow, onUnfollow } from '@/actions/follow'

import { Button } from './ui/button'

type FollowActionsProps = {
  isFollowing: boolean
  userId: string
}

export function ButtonsActions({ isFollowing, userId }: FollowActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
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
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`)
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
    })
  }

  const handleFollowOrUnfollow = () => {
    isFollowing ? handleUnfollow() : handleFollow()
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleFollowOrUnfollow}
        disabled={isPending}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
        {isPending && <Loader2 className="ml-2 size-5 animate-spin" />}
      </Button>

      <Button>Block user</Button>
    </>
  )
}
