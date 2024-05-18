'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { PATH_HOME } from '@/constants/paths'

export default function UserError() {
  return (
    <div className="flex h-[calc(100vh_-_80px)] flex-col items-center justify-center space-y-4 text-muted-foreground">
      <p>Something went wrong!</p>
      <Button variant="secondary" asChild>
        <Link href={PATH_HOME}>Go back home</Link>
      </Button>
    </div>
  )
}
