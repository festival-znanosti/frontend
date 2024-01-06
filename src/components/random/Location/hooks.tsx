import { useQuery } from '@tanstack/react-query'

import { getAllChildLocations } from '@/api/repository'
import { getAllParentLocations } from '@/api/repository'

export const useParentLocations = () => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['allParentLocations'],
    queryFn: getAllParentLocations,
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
