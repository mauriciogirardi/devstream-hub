import { ReactNode, Suspense } from 'react'

import { NavbarHome } from '@/components/navbar-home'
import { Sidebar, SidebarSkeleton } from '@/components/sidebar'
import { Container } from '@/components/sidebar/container'

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarHome />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}
