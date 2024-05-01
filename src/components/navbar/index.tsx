import Link from 'next/link'

import { PATH_HOME } from '@/constants/paths'

import { Logo } from '../logo'
import { Actions } from './actions'
import { Search } from './search'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-[49] flex h-20 w-full items-center justify-between gap-4 bg-zinc-100 px-2 shadow-sm dark:bg-[#252731] lg:px-4">
      <Link
        href={PATH_HOME}
        className="ring-offset-background transition-colors hover:opacity-75 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 lg:mr-0"
      >
        <Logo size={32} className="flex-row gap-4 lg:flex" isNav />
      </Link>
      <Search />
      <Actions />
    </nav>
  )
}
