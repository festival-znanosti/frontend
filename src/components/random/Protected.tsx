'use client'

import { useRouter } from 'next/navigation'

import { useAccountDetails } from '@/lib/useAccountDetails'

type Role = 'ADMIN' | 'USER'

export const Protected = ({ roles, children }: { roles: Role[]; children: React.ReactNode }) => {
  const { accountDetails, isLoadingAccountDetails } = useAccountDetails()

  const router = useRouter()

  if (isLoadingAccountDetails) {
    return null
  } else {
    if (!accountDetails) {
      router.push('/login')
      return null
    }

    const userRole = accountDetails.role === 0 ? 'ADMIN' : 'USER'
    if (!roles.includes(userRole)) {
      router.push('/login')
      return null
    }

    return <>{children}</>
  }
}
