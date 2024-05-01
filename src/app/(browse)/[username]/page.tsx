import { notFound } from 'next/navigation'

import { ButtonsActions } from '@/components/buttons-actions'
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

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser({ userId: user.id })
  const isBlocked = await isBlockedByUser({ userId: user.id })

  return (
    <div className="flex flex-col gap-y-4">
      <h1>username: {user.username}</h1>
      <h1>user id: {user.id}</h1>
      <h1>isFollowing: {`${isFollowing}`}</h1>
      <h1>Is blocked by this user: {`${isBlocked}`}</h1>
      <ButtonsActions
        isFollowing={isFollowing}
        isBlocked={isBlocked}
        userId={user.id}
      />
    </div>
  )
}
