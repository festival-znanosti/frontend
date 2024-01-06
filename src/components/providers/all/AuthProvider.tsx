import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

import { useAccountDetails } from '../../../lib/useAccountDetails'

import { SelfResponse } from '@/api/interface'

const AuthProviderContext = createContext<{
  accountDetails: SelfResponse | undefined
  refetchAccountDetails: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SelfResponse, Error>>
} | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { accountDetails, refetchAccountDetails } = useAccountDetails()

  return (
    <AuthProviderContext.Provider value={{ accountDetails, refetchAccountDetails }}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useGetAuthUser = () => {
  const user = useContext(AuthProviderContext)
  if (user === null) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return user
}

export const useIsAuthenticated = () => {
  const { accountDetails } = useGetAuthUser()
  return !!accountDetails?.role
}

export const useIsAdmin = () => {
  const { accountDetails } = useGetAuthUser()
  return accountDetails?.role === 0
}
