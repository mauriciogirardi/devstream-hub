import { Poppins } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

type Logo = {
  size?: number
  className?: string
  isNav?: boolean
  description?: string
}

export function Logo({
  size = 80,
  className,
  isNav = false,
  description = "Let's talk",
}: Logo) {
  return (
    <div className={cn('flex flex-col items-center gap-y-4', className)}>
      <div className="rounded-full bg-white p-1">
        <Image src="/duck.svg" alt="TalkDev" height={size} width={size} />
      </div>
      <div
        className={cn(
          'flex flex-col items-center',
          isNav && 'hidden items-start md:flex',
          font.className,
        )}
      >
        <p className={cn('text-xl font-semibold', isNav && 'text-lg')}>
          Talkdev
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
