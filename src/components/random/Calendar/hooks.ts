import { useQuery } from '@tanstack/react-query'

import { getAvailableTimeSlots } from '@/api/repository'

export const useAvailableTimeSlots = (locationId: number) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['availableTimeSlots', locationId],
    queryFn: () => getAvailableTimeSlots(locationId),
    enabled: !!locationId,
  })

  return {
    isPendingAvailableTimeSlots: isPending,
    availableTimeSlots: data,
    refetchAvailableTimeSlots: refetch,
  }
}
