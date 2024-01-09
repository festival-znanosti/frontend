import { useQuery } from '@tanstack/react-query'

import { getAllChildLocations, getLocationDetails, getMyEvents } from '@/api/repository'
import { getAllParentLocations } from '@/api/repository'

export const useParentLocations = () => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['allParentLocations'],
    queryFn: getAllParentLocations,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    isPendingParent: isPending,
    allParentLocations: data,
    refetchParentLocations: refetch,
  }
}

export const useChildLocations = (parentId: number) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['allChildLocations', parentId],
    queryFn: () => getAllChildLocations(parentId),
    enabled: !!parentId,
  })

  return {
    isPendingChild: isPending,
    allChildLocations: data,
    refetchChildLocations: refetch,
  }
}

export const useLocationDetails = (locationId: number) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['locationDetails', locationId],
    queryFn: () => getLocationDetails(locationId),
    enabled: !!locationId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    isPendingLocation: isPending,
    locationDetails: data,
    refetchLocationDetails: refetch,
  }
}

export const useMyEvents = (submitterId: number) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['myEvents', submitterId],
    queryFn: () => getMyEvents(submitterId),
    enabled: !!submitterId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    isPendingMyEvents: isPending,
    myEvents: data,
    refetchMyEvents: refetch,
  }
}
