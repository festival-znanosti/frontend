import { useQuery } from '@tanstack/react-query'

import { getAccountDetails } from '@/api/repository'

export const useAccountDetails = () => {
  const {
    data: accountDetails,
    isPending: isLoadingAccountDetails,
    refetch: refetchAccountDetails,
  } = useQuery({
    queryKey: ['accountDetails'],
    queryFn: getAccountDetails,
  })

  return {
    accountDetails,
    isLoadingAccountDetails,
    refetchAccountDetails,
  }
}
