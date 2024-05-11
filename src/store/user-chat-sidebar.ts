import { create } from 'zustand'

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

type ChatSidebarStore = {
  collapsed: boolean
  variant: ChatVariant
  onExpand: () => void
  onCollapse: () => void
  onChangeVariant: (variant: ChatVariant) => void
}

export const userChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}))
