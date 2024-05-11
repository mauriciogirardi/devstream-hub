'use client'

import { FormEvent, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import { ChatInfo } from './chat-info'

type ChatFormProps = {
  onSubmit: () => void
  value: string
  onChangeValue: (value: string) => void
  isHidden: boolean
  isFollowersOnly: boolean
  isDelayed: boolean
  isFollowing: boolean
}

export function ChatForm({
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
  onChangeValue,
  onSubmit,
  value,
}: ChatFormProps) {
  const [isDaleyBlocked, setIsDaleyBlocked] = useState(false)

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
  const isDisabled =
    isHidden || isDaleyBlocked || isFollowersOnlyAndNotFollowing

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!value || isDisabled) return

    if (isDelayed && !isDaleyBlocked) {
      setIsDaleyBlocked(true)

      setTimeout(() => {
        setIsDaleyBlocked(false)
        onSubmit()
      }, 3000)
    } else {
      onSubmit()
    }
  }

  if (isHidden) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          value={value}
          disabled={isDisabled}
          onChange={(event) => onChangeValue(event.target.value)}
          placeholder="Send a message"
          className={cn(
            'border-white/10',
            isFollowersOnly && 'rounded-t-none border-t-0',
          )}
        />
      </div>

      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  )
}

export function ChatFormSkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-16 w-full" />
      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  )
}
