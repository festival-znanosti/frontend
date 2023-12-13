// import { redirect } from 'next/navigation'

// import { fetchSelfServer } from '@/components/providers/all/auth/auth.server'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await fetchSelfServer()

  // if (!user) {
  //    redirect('/login')
  // }

  return <>{children}</>
}
