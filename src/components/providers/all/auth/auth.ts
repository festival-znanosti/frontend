import { getAuthToken } from './auth.client'

import { getAccountDetails } from '@/api/repository'
import { isClient } from '@/lib/utils'

// TODO: Fix this
export const fetchSelf = async (authToken: string | null) => {
  try {
    if (!authToken && isClient()) {
      authToken = getAuthToken()
    }

    const response = await getAccountDetails()

    return response
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}
