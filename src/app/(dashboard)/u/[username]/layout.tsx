import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { NavbarCreator } from '@/components/navbar-creator'
import { SidebarCreator } from '@/components/sidebar-creator'
import { ContainerCreator } from '@/components/sidebar-creator/container-creator'
import { PATH_HOME } from '@/constants/paths'
import { getSelfByUsername } from '@/lib/auth-service'

type CreatorLayoutProps = {
  children: ReactNode
  params: { username: string }
}

export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username)

  if (!self) {
    redirect(PATH_HOME)
  }

  return (
    <>
      <NavbarCreator />
      <div className="flex h-full pt-20">
        <SidebarCreator />
        <ContainerCreator>{children}</ContainerCreator>
      </div>
    </>
  )
}
