import { getStreams } from '@/lib/feed-services'

import { ResultCard, ResultCardSkeleton } from './result-card'
import { Skeleton } from './ui/skeleton'

export async function Results() {
  const streams = await getStreams()

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Streams we think you&apos;ll like
      </h2>

      {streams.length === 0 && (
        <div className="text-sm text-muted-foreground">No streams found.</div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {streams.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  )
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px]" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
