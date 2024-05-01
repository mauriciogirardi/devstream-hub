import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { PATH_HOME } from '@/constants/paths'

import { Button } from './ui/button'
import { NavbarActions, NavbarLogo, NavbarRoot } from './ui/navbar'

export function NavbarCreator() {
  return (
    <NavbarRoot>
      <NavbarLogo description="Creator dashboard" />

      <NavbarActions>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
        >
          <Link href={PATH_HOME} className="flex items-center gap-2">
            <LogOut className="size-5" />
            Exit
          </Link>
        </Button>

        <UserButton afterSignOutUrl={PATH_HOME} />
      </NavbarActions>
    </NavbarRoot>
  )
}
