'use client'

import { useUser } from '@clerk/nextjs'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { NavigationItem, NavigationItemSkeleton } from './navigation-item'

export function Navigation() {
  const pathname = usePathname()
  const { user } = useUser()

  const routes = [
    {
      label: 'Stream',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ]

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavigationItemSkeleton key={i} />
        ))}
      </ul>
    )
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavigationItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  )
}
