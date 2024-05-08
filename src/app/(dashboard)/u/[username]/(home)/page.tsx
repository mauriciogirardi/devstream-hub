import { currentUser } from '@clerk/nextjs/server'

import { StreamPlayer } from '@/components/stream-player'
import { getUserByUsername } from '@/lib/user-service'

type CreatorPageProps = {
  params: {
    username: string
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const externalUser = await currentUser()
  const user = await getUserByUsername({ username: params.username })

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error('Unauthorized')
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  )
}
