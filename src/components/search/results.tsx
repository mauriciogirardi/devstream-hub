import { getSearch } from '@/lib/search-service'

import { Skeleton } from '../ui/skeleton'
import { ResultsSearch, ResultsSearchSkeleton } from './result-search'

type ResultsProps = {
  term?: string
}

export async function Results({ term }: ResultsProps) {
  const data = await getSearch(term)

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        Results form term &quot;{term}&quot;
      </h2>

      {data.length === 0 && (
        <h3 className="text-sm text-muted-foreground">
          No results. Try searching for something else
        </h3>
      )}

      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultsSearch key={result.id} data={result} />
        ))}
      </div>
    </section>
  )
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-60" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultsSearchSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
