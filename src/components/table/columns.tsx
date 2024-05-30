'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '../ui/button'
import { UserAvatar } from '../user-avatar'
import { UnblockButton } from './unblock-button'

export type BlockedUser = {
  id: string
  userId: string
  imageUrl: string
  username: string
  createdAt: string
}

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-x-1"
      >
        Username
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={row.original.username}
          userAvatar={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-x-1"
      >
        Date Blocked
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="pl-5">
        <span>{row.original.createdAt}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <UnblockButton userId={row.original.userId} />
      </div>
    ),
  },
]
