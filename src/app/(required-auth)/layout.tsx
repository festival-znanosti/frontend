// import { redirect } from 'next/navigation'

import Sidebar from '@/components/layout/sidebar/Sidebar'

// import { fetchSelfServer } from '@/components/providers/all/auth/auth.server'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await fetchSelfServer()

  // if (!user) {
  //    redirect('/login')
  // }

  return (
    <div className="absolute flex h-full w-full">
      <Sidebar />
      <main className="flex h-full w-full flex-1 flex-col overflow-y-scroll p-6 md:p-10 "> {children}</main>
    </div>
  )
}
