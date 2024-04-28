/* eslint-disable no-useless-return */
'use client'

import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { FormEvent, useState } from 'react'

import { PATH_SEARCH } from '@/constants/paths'

import { Input } from './ui/input'

export function Search() {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!value.trim()) return

    const url = qs.stringifyUrl(
      {
        url: PATH_SEARCH,
        query: { term: value },
      },
      { skipEmptyString: true },
    )

    router.push(url)
  }

  const handleClearSearch = () => {
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center rounded-full border bg-input px-4 ring-offset-background transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-300 focus-within:ring-offset-2 dark:border-zinc-700 md:w-[500px]"
    >
      <Input
        type="text"
        placeholder="Search"
        className="w-full rounded-r-none border-0 bg-transparent p-0 pr-11 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      {value && (
        <X
          className="absolute right-12 size-5 cursor-pointer text-muted-foreground hover:text-primary"
          role="button"
          onClick={handleClearSearch}
          aria-label="Clear field search"
        />
      )}

      <SearchIcon
        className="size-5 text-muted-foreground hover:text-primary"
        type="submit"
        aria-label="Search button"
        role="button"
      />
    </form>
  )
}
