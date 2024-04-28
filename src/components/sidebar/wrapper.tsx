'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

type WrapperProps = {
  children: ReactNode
}

export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state)

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
