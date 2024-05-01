'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

type WrapperProps = {
  children: ReactNode
}

export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useCreatorSidebar((state) => state)

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-[70px] flex-col overflow-hidden border-r border-border dark:bg-[#22252e] lg:w-60',
        collapsed && 'lg:w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
