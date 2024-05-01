import { ToggleCardSkeleton } from '@/components/toggle-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChatLoading() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-10 w-52" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}
