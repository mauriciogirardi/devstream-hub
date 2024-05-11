'use client'

import { ChatIcon } from '@livekit/components-react'

import { Skeleton } from '../ui/skeleton'
import { ChatToggle } from './chat-toggle'
import { VariantToggle } from './variant-toggle'

export function ChatHeader() {
  return (
    <div className="relative border-b p-3">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
      </div>

      <p className="flex items-center justify-center gap-2 text-center font-semibold text-primary">
        <ChatIcon />
        Stream Chat
      </p>

      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
    </div>
  )
}

export function ChatHeaderSkeleton() {
  return (
    <div className="hidden items-center justify-between border-b p-3 md:flex">
      <Skeleton className="size-6" />
      <Skeleton className="ml-auto h-6 w-28" />
      <Skeleton className="size-6" />
    </div>
  )
}
