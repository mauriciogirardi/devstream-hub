import { Info } from 'lucide-react'
import { useMemo } from 'react'

import { Hint } from '../hint'

type ChatInfoProps = {
  isDelayed: boolean
  isFollowersOnly: boolean
}

export function ChatInfo({ isDelayed, isFollowersOnly }: ChatInfoProps) {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Only followers can chat'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Messages are delayed by 3 seconds'
    }

    if (isDelayed && isFollowersOnly) {
      return 'Only followers can chat. Messages are delayed by 3 seconds'
    }

    return ''
  }, [isFollowersOnly, isDelayed])

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers only'
    }

    if (isDelayed && !isFollowersOnly) {
      return 'Slow mode'
    }

    if (isDelayed && isFollowersOnly) {
      return 'Followers only and slow mode'
    }

    return ''
  }, [isFollowersOnly, isDelayed])

  if (!isDelayed && !isFollowersOnly) return null

  return (
    <div className="flex items-center gap-x-2 rounded-t-md border border-white/10 bg-white/10 p-2 text-muted-foreground">
      <Hint label={hint}>
        <Info className="size-4" />
      </Hint>

      <p className="text-sm font-semibold">{label}</p>
    </div>
  )
}
