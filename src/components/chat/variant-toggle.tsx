'use client'

import { MessageSquare, Users } from 'lucide-react'

import { ChatVariant, userChatSidebar } from '@/store/user-chat-sidebar'

import { Hint } from '../hint'
import { Button } from '../ui/button'

export function VariantToggle() {
  const { variant, onChangeVariant } = userChatSidebar()

  const isChat = variant === ChatVariant.CHAT
  const Icon = isChat ? Users : MessageSquare
  const label = isChat ? 'Community' : 'Go back to chat'

  const handleToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
  }

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
