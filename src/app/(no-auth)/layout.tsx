// import { redirect } from 'next/navigation'

export default async function NoAuthLayout({ children }: { children: React.ReactNode }) {
  // const user = await //find out user

  // if (user) {
  //   redirect('/')
  // }

  return { children }
}
