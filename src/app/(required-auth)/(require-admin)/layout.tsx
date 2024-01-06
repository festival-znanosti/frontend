import { Protected } from '@/components/random/Protected'

export default async function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <Protected roles={['ADMIN']}>{children}</Protected>
}
