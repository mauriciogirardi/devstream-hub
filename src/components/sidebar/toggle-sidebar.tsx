'use client'

import { useSidebar } from '@/store/use-sidebar'

import { Toggle } from '../toggle'

export function ToggleSidebar() {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

  return (
    <Toggle collapsed={collapsed} onCollapse={onCollapse} onExpand={onExpand} />
  )
}
