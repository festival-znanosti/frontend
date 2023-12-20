import { cn } from '@/lib/utils'

const PageTitle = ({ title, description, className }: { title: string; description?: string; className?: string }) => {
  return (
    <div className={cn('space-y-2 text-left', className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-zinc-500 dark:text-zinc-400">{description}</p>}
    </div>
  )
}

export default PageTitle
