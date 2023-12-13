// import { notFound } from 'next/navigation'

// import { fetchSelfServer } from '@/components/providers/all/auth/auth.server'

export default async function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await fetchSelfServer()

  // if (user?.role !== 0) {
  //   notFound()
  // }

  return <>{children}</>
}
