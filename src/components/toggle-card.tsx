'use client'

import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { updateStream } from '@/actions/stream'

import { Skeleton } from './ui/skeleton'
import { Switch } from './ui/switch'

type FieldType = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'
type ToggleCardProps = {
  field: FieldType
  label: string
  value: boolean
}

export function ToggleCard({ field, label, value }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition()

  const handleChangeSwitch = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat settings updated!'))
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="shrink-0 font-semibold">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-x-3">
            {isPending && (
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            )}
            <Switch
              checked={value}
              onCheckedChange={handleChangeSwitch}
              disabled={isPending}
            >
              {value ? 'On' : 'Off'}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ToggleCardSkeleton() {
  return <Skeleton className="w-full rounded-xl p-10" />
}
