'use client'

import { Loader2 } from 'lucide-react'
import { ElementRef, FormEvent, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { updateUser } from '@/actions/user'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'

type BioModelProps = {
  initialValue: string | null
}

export function BioModel({ initialValue }: BioModelProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [bio, setBio] = useState(initialValue || '')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(() => {
      updateUser({
        bio,
      })
        .then(() => {
          toast.success('Bio updated')
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            className="resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="User bio..."
            disabled={isPending}
          />

          <div className="flex items-center justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" size="sm" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={isPending}
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
