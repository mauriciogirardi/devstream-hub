'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { userChatSidebar } from '@/store/user-chat-sidebar'

import { Hint } from '../hint'
import { Button } from '../ui/button'

export function ChatToggle() {
  const { onCollapse, collapsed, onExpand } = userChatSidebar()

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
  const label = collapsed ? 'Expand' : 'Collapse'
  const handleToggle = () => (collapsed ? onExpand() : onCollapse())

  return (
    <div className="">
      <Hint label={label} asChild side="left">
        <Button
          className="h-auto bg-transparent p-2 hover:bg-white/10 hover:text-primary"
          variant="ghost"
          onClick={handleToggle}
        >
          <Icon className="size-4" />
        </Button>
      </Hint>
    </div>
  )
}
