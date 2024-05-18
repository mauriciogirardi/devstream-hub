'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { PATH_HOME } from '@/constants/paths'

import { db } from './db'

export async function getSelf() {
  const self = await currentUser()

  if (!self || !self.username) {
    redirect(PATH_HOME)
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  })

  if (!user) {
    throw new Error('User not found!')
  }

  return user
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser()

  if (!self || !self.username) {
    redirect(PATH_HOME)
  }

  const user = await db.user.findUnique({
    where: { username },
  })

  if (!user) {
    throw new Error('User not found!')
  }

  if (self.username !== user.username) {
    throw new Error('Unauthorized!')
  }

  return user
}
