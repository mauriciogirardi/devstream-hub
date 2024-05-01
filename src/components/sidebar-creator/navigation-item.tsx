import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

type NavigationItemProps = {
  label: string
  icon: LucideIcon
  href: string
  isActive: boolean
}

export function NavigationItem({
  href,
  icon: Icon,
  isActive,
  label,
}: NavigationItemProps) {
  const { collapsed } = useCreatorSidebar((state) => state)

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'h-12 w-full',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent',
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('size-4', collapsed ? 'mr-0' : 'mr-2')} />

          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  )
}

export function NavigationItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
