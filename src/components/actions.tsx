import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'

import { PATH_HOME } from '@/constants/paths'

import { Button } from './ui/button'

export async function Actions() {
  const user = await currentUser()

  return (
    <div className="flex items-center justify-end gap-x-2">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary" className="ml-8 lg:ml-0">
            Login
          </Button>
        </SignInButton>
      )}

      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="size-5 lg:mr-2" aria-label="Dashboard" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>

          <UserButton afterSignOutUrl={PATH_HOME} />
        </div>
      )}
    </div>
  )
}
