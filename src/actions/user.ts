'use server'

import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'

export async function updateUser(data: Partial<User>) {
  try {
    const self = await getSelf()

    const validData = {
      bio: data.bio,
    }

    const user = await db.user.update({
      where: { id: self.id },
      data: { ...validData },
    })

    revalidatePath(`/${self.username}`)
    revalidatePath(`/u/${self.username}`)

    return user
  } catch {
    throw new Error('Update user internal Error.')
  }
}
