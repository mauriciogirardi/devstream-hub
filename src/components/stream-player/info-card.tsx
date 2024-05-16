'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'

import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { InfoModal } from './info-modal'

type InfoCardProps = {
  hostIdentity: string
  viewerIdentity: string
  name: string
  thumbnailUrl: string | null
}

export function InfoCard({
  hostIdentity,
  name,
  thumbnailUrl,
  viewerIdentity,
}: InfoCardProps) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  if (!isHost) return null

  return (
    <div className="px-4">
      <div className="rounded-lg bg-[#22252e]">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="h-auto w-auto rounded-md bg-violet-600 p-2">
            <Pencil className="size-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold capitalize lg:text-lg">
              Edit your stream info
            </h2>
            <p className="text-xs text-muted-foreground lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>

        <Separator />

        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video w-[200px] overflow-hidden rounded-md border border-white/10">
                <Image
                  src={thumbnailUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function InfoCardSkeleton() {
  return (
    <div className="mt-2 px-4">
      <div className="rounded-lg bg-[#22252e]">
        <div className="flex items-center gap-x-2.5 p-4">
          <Skeleton className="size-10 rounded-md" />

          <div>
            <Skeleton className="mb-1 h-5 w-52" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="ml-auto h-5 w-16" />
        </div>

        <Separator />

        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Name</h3>
            <Skeleton className="h-5 w-32" />
          </div>

          <div>
            <h3 className="mb-2 text-sm text-muted-foreground">Thumbnail</h3>
            <Skeleton className="h-[100px] w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
