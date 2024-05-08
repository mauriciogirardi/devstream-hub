'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { Hint } from '../hint'
import { Slider } from '../ui/slider'

type VolumeControlProps = {
  onToggle: () => void
  onChange: (value: number) => void
  value: number
}

export function VolumeControl({
  onChange,
  onToggle,
  value,
}: VolumeControlProps) {
  const isMuted = value === 0
  const isAboveHalf = value > 50
  const label = isMuted ? 'Unmute' : 'Mute'

  let Icon = Volume1

  if (isMuted) {
    Icon = VolumeX
  }

  if (isAboveHalf) {
    Icon = Volume2
  }

  const handleChange = (value: number[]) => {
    onChange(value[0])
  }

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="size-6" />
        </button>
      </Hint>

      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        min={1}
      />
    </div>
  )
}
