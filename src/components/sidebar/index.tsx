import { getFollowedUsers } from '@/lib/follow-service'
import { getRecommended } from '@/lib/recommended-service'

import { ToggleSkeleton } from '../toggle'
import { Following, FollowingSkeleton } from './following'
import { Recommended, RecommendedSkeleton } from './recommended'
import { ToggleSidebar } from './toggle-sidebar'
import { Wrapper } from './wrapper'

export async function Sidebar() {
  const recommended = await getRecommended()
  const following = await getFollowedUsers()

  return (
    <Wrapper>
      <ToggleSidebar />

      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col overflow-hidden border-r border-border dark:bg-[#22252e] lg:w-60">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
