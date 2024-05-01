import { Search } from '../search'
import { NavbarActions, NavbarLogo, NavbarRoot } from '../ui/navbar'
import { Actions } from './actions'

export function NavbarHome() {
  return (
    <NavbarRoot>
      <NavbarLogo />

      <Search />

      <NavbarActions>
        <Actions />
      </NavbarActions>
    </NavbarRoot>
  )
}
