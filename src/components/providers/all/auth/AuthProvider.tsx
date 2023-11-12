import { ClientAuthProvider } from './AuthProvider.client'

import { fetchSelfServer } from '@/lib/api/auth.server'

export async function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = await fetchSelfServer()
  return <ClientAuthProvider user={user}>{children}</ClientAuthProvider>
}
