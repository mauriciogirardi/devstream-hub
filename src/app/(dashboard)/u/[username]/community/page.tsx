import { format } from 'date-fns'

import { getBlockedUsers } from '@/actions/block'
import { DataTable } from '@/components/table'
import { columns } from '@/components/table/columns'

export default async function CommunityPage() {
  const blockedUsers = await getBlockedUsers()

  const formattedDate = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy'),
  }))

  return (
    <section className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>

      <DataTable columns={columns} data={formattedDate} />
    </section>
  )
}
