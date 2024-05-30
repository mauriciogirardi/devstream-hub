'use client'

import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { onUnblock } from '@/actions/block'

import { Button } from '../ui/button'

type UnblockButtonProps = {
  userId: string
}

export function UnblockButton({ userId }: UnblockButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => {
          toast.success(`User ${result.blocked.username} unblocked.`)
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <Button
      onClick={handleUnblock}
      disabled={isPending}
      size="sm"
      variant="link"
      className="text-rose-400"
    >
      Unblocked
      {isPending && <Loader2 className="ml-2 size-4 animate-spin" />}
    </Button>
  )
}
