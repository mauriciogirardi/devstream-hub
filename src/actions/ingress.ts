'use server'

import {
  type CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressAudioOptions,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressVideoOptions,
  RoomServiceClient,
  TrackSource,
} from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

import { env } from '@/env'
import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'

const roomService = new RoomServiceClient(
  env.LIVEKIT_API_URL,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
)

const ingressClient = new IngressClient(
  env.LIVEKIT_API_URL,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
)

export async function resetIngress(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  })

  const rooms = await roomService.listRooms([hostIdentity])

  for (const room of rooms) {
    await roomService.deleteRoom(room.name)
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId)
    }
  }
}

export async function createIngress(ingressType: IngressInput) {
  const self = await getSelf()

  await resetIngress(self.id)

  const options: CreateIngressOptions & { enableTranscoding?: boolean } = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true
  } else {
    options.video = {
      source: TrackSource.SCREEN_SHARE,
      encodingOptions: {
        case: 'preset',
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    } as unknown as IngressVideoOptions

    options.audio = {
      source: TrackSource.SCREEN_SHARE_AUDIO,
      encodingOptions: {
        case: 'preset',
        value: IngressAudioEncodingPreset.OPUS_MONO_64KBS,
      },
    } as unknown as IngressAudioOptions
  }

  const ingress = await ingressClient.createIngress(ingressType, options)

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress!')
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  })

  revalidatePath(`/u/${self.username}/keys`)

  return ingress
}
