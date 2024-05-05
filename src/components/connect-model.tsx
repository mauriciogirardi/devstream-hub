'use client'

import { IngressInput } from 'livekit-server-sdk'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { createIngress } from '@/actions/ingress'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import * as D from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export function ConnectModel() {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [isPending, startTransition] = useTransition()
  const [ingressType, setIngressType] = useState<IngressType>(RTMP)

  const handleSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('Ingress created!')
          closeRef.current?.click()
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <D.Dialog>
      <D.DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader className="text-left">
          <D.DialogTitle>Generate connection</D.DialogTitle>
        </D.DialogHeader>

        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="size-4" />
          <AlertTitle className="mb-3">Warning!</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            This action will reset all active streams using the current
            connection.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-end gap-3">
          <D.DialogClose asChild ref={closeRef}>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </D.DialogClose>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Generate
            {isPending && <Loader2 className="ml-1 size-4 animate-spin" />}
          </Button>
        </div>
      </D.DialogContent>
    </D.Dialog>
  )
}
