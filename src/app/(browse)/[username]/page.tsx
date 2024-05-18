import { notFound } from 'next/navigation'

import { StreamPlayer } from '@/components/stream-player'
import { isBlockedByUser } from '@/lib/block-service'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'

type UsernamePageProps = {
  params: {
    username: string
  }
}

export default async function UsernamePage({ params }: UsernamePageProps) {
  const user = await getUserByUsername({ username: params.username })

  if (!user || !user.stream) {
    notFound()
  }

  const userId = user.id
  const isFollowing = await isFollowingUser({ userId })
  const isBlocked = await isBlockedByUser({ userId })

  if (isBlocked) {
    notFound()
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  )
}
