'use client'

import { Loader2, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

import { updateStream } from '@/actions/stream'
import { UploadDropzone } from '@/utils/uploadthing.ts'

import { Hint } from '../hint'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type InfoModalProps = {
  initialName: string
  initialThumbnailUrl: string | null
}

export function InfoModal({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)
  const closeRef = useRef<ElementRef<'button'>>(null)

  const handleRemoveThumbnail = () => {
    startTransition(() => {
      startTransition(() => {
        updateStream({
          thumbnailUrl: null,
        })
          .then(() => {
            toast.success('Thumbnail removed')
            setThumbnailUrl(null)
          })
          .catch(() => toast.error('Something went wrong'))
      })
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(() => {
      updateStream({
        name,
      })
        .then(() => {
          toast.success('Steam updated')
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="link" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream info</DialogTitle>
        </DialogHeader>

        <form className="space-y-14" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Stream name"
              onChange={handleChange}
              value={name}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Thumbnail</Label>
            <div className="rounded-xl outline-dashed outline-muted">
              {thumbnailUrl ? (
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                  <div className="absolute right-2 top-2 z-10">
                    <Hint side="left" label="Remove thumbnail" asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="primary"
                        className="h-auto w-auto p-1.5"
                        onClick={handleRemoveThumbnail}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash className="size-4" />
                        )}
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <UploadDropzone
                  className=" focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: { color: '#fff' },
                    allowedContent: { color: '#fff' },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    closeRef.current?.click()
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" size="sm" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              size="sm"
              variant="primary"
            >
              Save
              {isPending && <Loader2 className="ml-2 size-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
