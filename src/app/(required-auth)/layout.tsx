'use client'

import Sidebar from '@/components/layout/sidebar/Sidebar'
import { useIsAuthenticated } from '@/components/providers/all/AuthProvider'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    // naviagte to login
    console.log('not authenticated')
  }

  return (
    <div className="flex h-full w-full overflow-y-hidden">
      <Sidebar />
      <main className="flex min-h-full w-full flex-1 flex-grow overflow-y-scroll p-6 md:p-10 ">{children}</main>
    </div>
  )
}
