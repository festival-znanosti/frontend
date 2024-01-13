import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Card } from '@/components/ui/card'

const NewCard = () => {
  return (
    <Card className="h-[300px] w-[280px] transition-colors hover:bg-zinc-200 dark:hover:bg-gray-800">
      <Link href="/new-form">
        <div className="flex h-full w-full items-center justify-center p-6">
          <Plus size="40" />
        </div>
      </Link>
    </Card>
  )
}

export default NewCard
