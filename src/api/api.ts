import { getAuthToken } from '@/components/providers/all/auth/auth.client'
import { isClient } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JSON_HEADER: { [key: string]: any } = {
  'Content-Type': 'application/json',
  credentials: 'include',
}

const addHeader = (headers: HeadersInit, name: string, value: string) => {
  if (Array.isArray(headers)) {
    headers.push([name, value])
    return
  }

  if (headers instanceof Headers) {
    headers.append(name, value)
    return
  }

  headers[name] = value
}

export type BaseJsonOptions = RequestInit & {
  authToken?: string | null
}

async function handleResponse<TData>(res: Response) {
  const data: TData = await res.json()

  if (!res.ok) {
    // @ts-ignore
    throw new Error(data.message)
  }

  return data
}

async function sendRequest<TData>(
  url: string,
  method: string,
  body = {},
  options: BaseJsonOptions = {}
): Promise<TData> {
  const { ...fetchOptions } = options

  const headers = options?.headers ?? {}
  let authToken = options?.authToken
  if (!authToken && isClient()) {
    authToken = getAuthToken()
  }

  if (authToken) {
    addHeader(headers, 'Authorization', `Bearer ${authToken}`)
  }

  const res = await fetch(url, {
    method,
    ...fetchOptions,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    headers: {
      ...JSON_HEADER,
      ...headers,
    },
  })

  return await handleResponse(res)
}

async function sendRequestNoBody<TData>(url: string, method: string, options: BaseJsonOptions = {}): Promise<TData> {
  const { ...fetchOptions } = options

  const headers = options?.headers ?? {}
  let authToken = options?.authToken
  if (!authToken && isClient()) {
    authToken = getAuthToken()
  }

  if (authToken) {
    addHeader(headers, 'Cookie', `${authToken}`)
  }

  const res = await fetch(url, {
    method,
    ...fetchOptions,
    credentials: 'include',
    headers: {
      ...JSON_HEADER,
      ...headers,
    },
  })

  return await handleResponse(res)
}

export const getJson = async <TData>(url: string, options: BaseJsonOptions = {}) =>
  sendRequestNoBody<TData>(url, 'GET', options)

export const postJson = async <TData>(url: string, body = {}, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'POST', body, options)

export const putJson = async <TData>(url: string, body = {}, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'PUT', body, options)

export const deleteJson = async <TData>(url: string, options: BaseJsonOptions = {}) =>
  sendRequestNoBody<TData>(url, 'DELETE', options)
