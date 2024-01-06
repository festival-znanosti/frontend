import { useQuery } from '@tanstack/react-query'

import { getAccountDetails } from '@/api/repository'

export const useAccountDetails = () => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['accountDetails'],
    queryFn: getAccountDetails,
  })

  return {
    isPendingAccountDetails: isPending,
    accountDetails: data,
    refetchAccountDetails: refetch,
  }
}
