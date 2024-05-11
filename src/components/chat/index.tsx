'use client'

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { ChatVariant, userChatSidebar } from '@/store/user-chat-sidebar'

import { ChatCommunity } from './chat-community'
import { ChatForm, ChatFormSkeleton } from './chat-form'
import { ChatHeader, ChatHeaderSkeleton } from './chat-header'
import { ChatList, ChatListSkeleton } from './chat-list'

type ChatProps = {
  viewerName: string
  hostName: string
  hostIdentity: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export function Chat({
  hostIdentity,
  hostName,
  isFollowing,
  viewerName,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery('max-width: 1024px')
  const { variant, onExpand } = userChatSidebar((state) => state)
  const [value, setValue] = useState('')

  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const { chatMessages: messages, send } = useChat()

  const isOnline = participant && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const handleSubmit = () => {
    if (!send) {
      return
    }

    send(value)
    setValue('')
  }

  const handleChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="flex h-[calc(100vh_-_80px)] flex-col border-b border-l pt-0 dark:bg-[#22252e]">
      <ChatHeader />

      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />

          <ChatForm
            onChangeValue={handleChange}
            onSubmit={handleSubmit}
            isDelayed={isChatDelayed}
            value={value}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isFollowing={isFollowing}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh_-_80px)] flex-col border-b border-l pt-0 dark:bg-[#22252e]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}
