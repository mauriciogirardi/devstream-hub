'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { CopyButton } from './copy-button'
import { Button } from './ui/button'
import { Input } from './ui/input'

type KeyCardProps = {
  value: string | null
}

export default function KeyCard({ value }: KeyCardProps) {
  const [show, setShow] = useState(false)

  const IconPassword = show ? Eye : EyeOff

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="shrink-0 font-semibold">Stream key</p>

        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder="Stream key"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShow((prev) => !prev)}
              aria-label={show ? 'Show password' : 'Hide password'}
            >
              <IconPassword size="icon" className="size-4" />
              <span className="sr-only">
                {show ? 'Show password' : 'Hide password'}
              </span>
            </Button>
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}
