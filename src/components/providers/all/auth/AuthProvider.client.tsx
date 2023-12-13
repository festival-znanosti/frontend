'use client'

import { createContext, useContext, useState } from 'react'

import { SelfResponse } from '@/api/interface'

const AuthProviderContext = createContext<SelfResponse | null>(null)

const AuthProviderClient = ({ children, user }: { children: React.ReactNode; user: SelfResponse | null }) => {
  const [data, _setData] = useState(user)

  return <AuthProviderContext.Provider value={data}>{children}</AuthProviderContext.Provider>
}

export const useGetAuthUser = () => {
  const user = useContext(AuthProviderContext)
  if (user === null || user === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return user
}

export const useIsAuthenticated = () => {
  const user = useGetAuthUser()
  return user !== null
}

export const useIsAdmin = () => {
  const user = useGetAuthUser()
  return user.role === 0
}

export default AuthProviderClient
