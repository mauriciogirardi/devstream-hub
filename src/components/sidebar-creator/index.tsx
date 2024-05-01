import { Navigation } from './navigation'
import { ToggleSidebarCreator } from './toggle-sidebar-creator'
import { Wrapper } from './wrapper'

export function SidebarCreator() {
  return (
    <Wrapper>
      <ToggleSidebarCreator />
      <Navigation />
    </Wrapper>
  )
}
