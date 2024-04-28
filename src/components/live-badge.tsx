import { cn } from '@/lib/utils'

type LiveBadgeProps = {
  className?: string
}

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-background bg-rose-500 p-0.5 px-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-white',
        className,
      )}
    >
      Live
    </div>
  )
}
