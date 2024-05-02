import { CardUrl } from '@/components/card-url'
import { ConnectModel } from '@/components/connect-model'
import KeyCard from '@/components/key-card'
import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'

export default async function KeysPage() {
  const self = await getSelf()
  const stream = await getStreamByUserId({ userId: self.id })

  if (!stream) {
    throw new Error('Stream not found!')
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>

        <ConnectModel />
      </div>

      <div className="space-y-3">
        <CardUrl value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  )
}
