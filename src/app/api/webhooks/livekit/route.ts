import { WebhookReceiver } from 'livekit-server-sdk'
import { headers } from 'next/headers'

import { env } from '@/env'
import { db } from '@/lib/db'

const receiver = new WebhookReceiver(
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
)

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = headers()
  const authorization = headerPayload.get('Authorization')

  if (!authorization) {
    return new Response('No authorization header', { status: 401 })
  }

  const event = receiver.receive(body, authorization)

  switch (event.event) {
    case 'ingress_started':
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      })
      break
    case 'ingress_ended':
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      })
      break
    default:
      return new Response('Invalid event', { status: 400 })
  }

  return new Response('', { status: 200 })
}
