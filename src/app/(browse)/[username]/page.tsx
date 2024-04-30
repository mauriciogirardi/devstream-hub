import { notFound } from 'next/navigation'

import { FollowActions } from '@/components/follow-actions'
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

  return (
    <div className="flex flex-col gap-y-4">
      <h1>username: {user.username}</h1>
      <h1>user id: {user.id}</h1>
      <h1>isFollowing: {`${isFollowing}`}</h1>
      <FollowActions isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}
