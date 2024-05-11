'use client'

import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'
import { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { ChatCommunityItem } from './chat-community-item'

type ChatCommunityProps = {
  viewerName: string
  hostName: string
  isHidden: boolean
}

export function ChatCommunity({
  hostName,
  isHidden,
  viewerName,
}: ChatCommunityProps) {
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounceValue<string>(value, 500)
  const participants = useParticipants()

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`

        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant)
        }

        return acc
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    )

    return deduped.filter((participant) =>
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
    )
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
          No results
        </p>

        {filteredParticipants.map((participant) => (
          <ChatCommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
