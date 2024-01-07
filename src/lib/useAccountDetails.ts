import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getAccountDetails, logout } from '@/api/repository'
import { toast } from '@/components/ui/use-toast'

export const useAccountDetails = () => {
  const {
    data: accountDetails,
    isPending: isLoadingAccountDetails,
    refetch: refetchAccountDetails,
    isError,
  } = useQuery({
    queryKey: ['accountDetails'],
    queryFn: getAccountDetails,
    retry: false,
    enabled: true,
  })

  return {
    accountDetails,
    isLoadingAccountDetails,
    refetchAccountDetails,
    isError,
  }
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await logout()
      return response
    },

    onSuccess(response) {
      queryClient.setQueryData(['accountDetails'], null)
      queryClient.resetQueries({ queryKey: ['accountDetails'] })
      toast({
        title: 'Uspjeh!',
        description: response.message,
      })
    },

    onError(error) {
      toast({
        title: 'Greška',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return { logout: logoutMutation }
}
