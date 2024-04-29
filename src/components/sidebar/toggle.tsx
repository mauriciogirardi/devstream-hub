'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { useSidebar } from '@/store/use-sidebar'

import { Hint } from '../hint'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function Toggle() {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

  const label = collapsed ? 'Expand' : 'Collapse'

  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} asChild side="right">
            <Button
              className="h-auto p-2"
              variant="ghost"
              onClick={onExpand}
              aria-label="Expand sidebar"
            >
              <ArrowRightFromLine className="size-4" />
              <span className="sr-only">Expend sidebar</span>
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              className="ml-auto h-auto p-2"
              variant="ghost"
              onClick={onCollapse}
              aria-label="Collapse sidebar"
            >
              <ArrowLeftFromLine className="size-4" />
              <p className="sr-only">Collapse sidebar</p>
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export function ToggleSkeleton() {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-5 w-[100px]" />
      <Skeleton className="size-6" />
    </div>
  )
}
