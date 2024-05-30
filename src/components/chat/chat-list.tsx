import { ReceivedChatMessage } from '@livekit/components-react'

import { Skeleton } from '../ui/skeleton'
import { ChatMessage } from './chat-message'

type ChatListProps = {
  messages: ReceivedChatMessage[]
  isHidden: boolean
}

export function ChatList({ isHidden, messages }: ChatListProps) {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto p-3 scrollbar-thin">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  )
}

export function ChatListSkeleton() {
  return (
    <div className="h-hull flex flex-1 items-center justify-center">
      <Skeleton className="h-6 w-1/2" />
    </div>
  )
}
