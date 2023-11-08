// import { redirect } from 'next/navigation'

export default async function RequireAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await //find out user

  // if (!user) {
  //   redirect('/login')
  // }

  return <>{children}</>
}
