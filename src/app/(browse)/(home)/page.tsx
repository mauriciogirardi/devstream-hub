import { Suspense } from 'react'

import { Results, ResultsSkeleton } from '@/components/results-home'

export default function Home() {
  return (
    <section className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </section>
  )
}
