'use client'

import { AlertTriangle } from 'lucide-react'

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

export function ConnectModel() {
  return (
    <D.Dialog>
      <D.DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader className="text-left">
          <D.DialogTitle>Generate connection</D.DialogTitle>
        </D.DialogHeader>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
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
          <D.DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </D.DialogClose>
          <Button variant="primary" size="sm">
            Generate
          </Button>
        </div>
      </D.DialogContent>
    </D.Dialog>
  )
}
