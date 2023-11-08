// import { notFound } from 'next/navigation'

export default async function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await //find out user

  // if (user?.role !== 'admin') {
  //   notFound()
  // }

  return { children }
}
