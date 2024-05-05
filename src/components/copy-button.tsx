'use client'

import { CheckCheck, Copy } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

type CopyButtonProps = {
  value: string | null
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (!value) return

    setIsCopied(true)
    navigator.clipboard.writeText(value)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const Icon = isCopied ? CheckCheck : Copy

  return (
    <Button
      onClick={handleCopy}
      size="icon"
      variant="ghost"
      disabled={!value || isCopied}
    >
      <Icon className={cn('size-4', isCopied && 'text-emerald-300')} />
    </Button>
  )
}
