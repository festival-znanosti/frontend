import { cookies } from 'next/headers'

import { fetchSelf } from './auth'
import { AUTH_TOKEN_COOKIE_NAME } from './auth.common'

export const getAuthToken = () => {
  const myCookie = cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value
  return myCookie ?? null
}

export const fetchSelfServer = async () => {
  const token = getAuthToken()

  return fetchSelf(token)
}
