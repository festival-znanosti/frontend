import { getAuthToken } from './auth.client'

import { auth } from '@/api/repository'
import { isClient } from '@/lib/utils'

// TODO: Fix this
export const fetchSelf = async (authToken: string | null) => {
  try {
    if (!authToken && isClient()) {
      authToken = getAuthToken()
    }

    const response = await auth()

    if (response?.status === 'success') {
      return response.data
    }

    return null
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}
