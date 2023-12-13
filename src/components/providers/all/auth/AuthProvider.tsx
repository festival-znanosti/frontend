import { fetchSelfServer } from './auth.server'
import AuthProviderClient from './AuthProvider.client'

const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const user = await fetchSelfServer()

  return <AuthProviderClient user={user}>{children}</AuthProviderClient>
}

export default AuthProvider
