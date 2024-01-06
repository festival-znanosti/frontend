// import { redirect } from 'next/navigation'

import Sidebar from '@/components/layout/sidebar/Sidebar'
// import { useAccountDetails } from '@/components/providers/all/auth/auth_NEW'

// import { fetchSelfServer } from '@/components/providers/all/auth/auth.server'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await fetchSelfServer()

  // if (!user) {
  //    redirect('/login')
  // }

  // const { accountDetails, isPendingAccountDetails, refetchAccountDetails } = useAccountDetails()

  // if (isPendingAccountDetails) {
  //   return <div>Loading...</div>
  // }

  // if (!accountDetails) {
  //   return <div>Not authenticated</div>
  // }

  // console.log('AccountDetails', accountDetails)

  return (
    <div className="flex h-full w-full overflow-y-hidden">
      <Sidebar />
      <main className="flex min-h-full w-full flex-1 flex-grow overflow-y-scroll p-6 md:p-10 ">{children}</main>
    </div>
  )
}
