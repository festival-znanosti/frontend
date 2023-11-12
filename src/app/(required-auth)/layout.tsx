// import { redirect } from 'next/navigation'

import { AuthProvider } from '@/components/providers/all/auth/AuthProvider'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await //find out user

  // if (!user) {
  //   redirect('/login')
  // }

  return <AuthProvider>{children}</AuthProvider>
}
