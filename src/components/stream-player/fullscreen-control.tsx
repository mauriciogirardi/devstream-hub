'use client'

import { Maximize, Minimize } from 'lucide-react'

import { Hint } from '../hint'

type FullscreenControlProps = {
  isFullscreen: boolean
  onToggle: () => void
}

export function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) {
  const Icon = isFullscreen ? Minimize : Maximize
  const label = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'

  return (
    <div className="flex gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="rounded-lg bg-zinc-600 p-1.5 dark:text-white"
        >
          <Icon className="size-5" />
        </button>
      </Hint>
    </div>
  )
}
