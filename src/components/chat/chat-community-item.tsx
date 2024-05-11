'use client'

import { Loader2, MinusCircle } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onBlock } from '@/actions/block'
import { cn, stringToColor } from '@/lib/utils'

import { Hint } from '../hint'
import { Button } from '../ui/button'

type ChatCommunityItemProps = {
  hostName: string
  viewerName: string
  participantName?: string
  participantIdentity: string
}

export function ChatCommunityItem({
  hostName,
  participantIdentity,
  viewerName,
  participantName,
}: ChatCommunityItemProps) {
  const [isPending, startTransaction] = useTransition()

  const color = stringToColor(participantName || '')
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return

    startTransaction(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}.`))
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <div
      className={cn(
        'group  flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5',
        isPending && 'pointer-events-none opacity-50',
      )}
    >
      <p style={{ color }}>{participantName}</p>

      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <MinusCircle className="size-4" />
            )}
          </Button>
        </Hint>
      )}
    </div>
  )
}
