import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { FullscreenControl } from './fullscreen-control'
import { VolumeControl } from './volume-control'

type LiveVideoProps = {
  participant: Participant
}

export function LiveVideo({ participant }: LiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(0)

  const handleChangeVolume = (value: number) => {
    setVolume(+value)

    if (videoRef.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = +value * 0.01
    }
  }

  const handleMuted = () => {
    const isMuted = volume === 0
    setVolume(isMuted ? 50 : 0)

    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  const handleToggle = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen()
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null
    setIsFullscreen(isCurrentlyFullscreen)
  }

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })

  useEffect(() => {
    handleChangeVolume(0)
  }, [])

  return (
    <div className="relative flex h-full" ref={wrapperRef}>
      <video ref={videoRef} width="100%" />
      <div className="w-hull absolute top-0 h-full w-full opacity-0 group-hover:opacity-100 group-hover:transition-all">
        <div className="absolute bottom-0 left-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={handleChangeVolume}
            onToggle={handleMuted}
            value={volume}
          />

          <FullscreenControl
            onToggle={handleToggle}
            isFullscreen={isFullscreen}
          />
        </div>
      </div>
    </div>
  )
}
