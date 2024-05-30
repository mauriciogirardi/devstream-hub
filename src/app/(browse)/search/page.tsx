import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Results, ResultsSkeleton } from '@/components/search/results'
import { PATH_HOME } from '@/constants/paths'

type SearchPageProps = {
  searchParams: {
    term?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    redirect(PATH_HOME)
  }

  return (
    <section className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </section>
  )
}
