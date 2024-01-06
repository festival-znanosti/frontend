import Sidebar from '@/components/layout/sidebar/Sidebar'
import { Protected } from '@/components/random/Protected'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected roles={['USER', 'ADMIN']}>
      <div className="flex h-full w-full overflow-y-hidden">
        <Sidebar />
        <main className="flex min-h-full w-full flex-1 flex-grow overflow-y-scroll p-6 md:p-10 ">{children}</main>
      </div>
    </Protected>
  )
}
