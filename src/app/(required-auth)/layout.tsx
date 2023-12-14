// import { redirect } from 'next/navigation'

import Sidebar from '@/components/layout/sidebar/Sidebar'

// import { fetchSelfServer } from '@/components/providers/all/auth/auth.server'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await fetchSelfServer()

  // if (!user) {
  //    redirect('/login')
  // }

  return (
    <div className="flex w-full h-full absolute">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full h-auto"> {children}</div>
    </div>
  )
}
