'use client'

import { ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

import { ToggleSkeleton } from '../toggle'
import { FollowingSkeleton } from './following'
import { RecommendedSkeleton } from './recommended'

type WrapperProps = {
  children: ReactNode
}

export function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient()
  const { collapsed } = useSidebar((state) => state)

  if (!isClient) {
    return (
      <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col overflow-hidden border-r border-border dark:bg-[#22252e] lg:w-60">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col overflow-hidden border-r border-border dark:bg-[#22252e]',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
