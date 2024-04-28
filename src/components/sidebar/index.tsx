import { getRecommended } from '@/lib/recommended-service'

import { Recommended, RecommendedSkeleton } from './recommended'
import { Toggle } from './toggle'
import { Wrapper } from './wrapper'

export async function Sidebar() {
  const recommended = await getRecommended()

  return (
    <Wrapper>
      <Toggle />

      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col overflow-hidden border-r border-border dark:bg-[#22252e] lg:w-60">
      <div className="mt-24">
        <RecommendedSkeleton />
      </div>
    </aside>
  )
}
