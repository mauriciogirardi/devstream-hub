import Link from 'next/link'
import { ComponentProps } from 'react'

import { PATH_HOME } from '@/constants/paths'
import { cn } from '@/lib/utils'

import { Logo } from '../logo'

type NavbarRootProps = ComponentProps<'nav'>
export function NavbarRoot({ className, ...props }: NavbarRootProps) {
  return (
    <nav
      {...props}
      className={cn(
        'fixed top-0 z-[49] flex h-20 w-full items-center justify-between gap-4 bg-zinc-100 px-2 shadow-sm dark:bg-[#252731] lg:px-4',
        className,
      )}
    />
  )
}

type NavbarLogoProps = {
  description?: string
}
export function NavbarLogo({ description }: NavbarLogoProps) {
  return (
    <Link
      href={PATH_HOME}
      className="ring-offset-background transition-colors hover:opacity-75 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 lg:mr-0"
    >
      <Logo
        size={32}
        className="flex-row gap-4 lg:flex"
        isNav
        description={description}
      />
    </Link>
  )
}

type NavbarActionsProps = ComponentProps<'div'>
export function NavbarActions({ className, ...props }: NavbarActionsProps) {
  return (
    <div
      {...props}
      className={cn('flex items-center justify-end gap-x-2', className)}
    />
  )
}
