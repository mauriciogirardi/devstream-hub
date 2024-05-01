'use client'

import { useCreatorSidebar } from '@/store/use-creator-sidebar'

import { Toggle } from '../toggle'

export function ToggleSidebarCreator() {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state,
  )

  return (
    <Toggle
      collapsed={collapsed}
      onCollapse={onCollapse}
      onExpand={onExpand}
      text="Dashboard"
    />
  )
}
