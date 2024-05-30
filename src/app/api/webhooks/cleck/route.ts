import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

import { resetIngress } from '@/actions/ingress'
import { env } from '@/env'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk dashboard to .env or .env.local',
    )
  }

  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  const eventType = evt.type

  try {
    switch (eventType) {
      case 'user.created':
        await db.user.create({
          data: {
            externalUserId: payload.data.id,
            username: payload.data.username,
            imageUrl: payload.data.image_url,
            stream: {
              create: {
                name: `${payload.data.username}'s stream`,
              },
            },
          },
        })
        break
      case 'user.updated':
        await db.user.update({
          where: {
            externalUserId: payload.data.id,
          },
          data: {
            username: payload.data.username,
            imageUrl: payload.data.image_url,
          },
        })
        break
      case 'user.deleted':
        await resetIngress(payload.data.id)
        await db.user.delete({
          where: {
            externalUserId: payload.data.id,
          },
        })
        break
      default:
        return new Response('Invalid event', { status: 400 })
    }
  } catch (err) {
    console.error('Error processing webhook event:', err)
    return new Response('Error occurred while processing webhook event', {
      status: 500,
    })
  }

  return new Response('', { status: 200 })
}
