import { ReactNode, Suspense } from 'react'

import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import { Sidebar, SidebarSkeleton } from '@/components/sidebar'

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}
