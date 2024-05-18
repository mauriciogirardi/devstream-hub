import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { PATH_HOME } from '@/constants/paths'

export default function UserNotFound() {
  return (
    <div className="flex h-[calc(100vh_-_80px)] flex-col items-center justify-center space-y-4 text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>

      <Button variant="secondary" asChild>
        <Link href={PATH_HOME}>Go back home</Link>
      </Button>
    </div>
  )
}
