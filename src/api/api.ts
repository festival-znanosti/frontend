/* eslint-disable @typescript-eslint/no-explicit-any */
const JSON_HEADER: { [key: string]: any } = {
  'Content-Type': 'application/json',
  accept: 'application/json',
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
  const isBodyEmpty = Object.keys(body).length === 0

  const res = await fetch(url, {
    method,
    ...fetchOptions,
    body: !isBodyEmpty ? JSON.stringify(body) : null,
    credentials: 'include',
    headers: {
      ...JSON_HEADER,
      ...headers,
    },
  })

  return await handleResponse(res)
}

export const getJson = async <TData>(url: string, body?: { [key: string]: any }, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'GET', body, options)

export const postJson = async <TData>(url: string, body: { [key: string]: any }, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'POST', body, options)

export const putJson = async <TData>(url: string, body: { [key: string]: any }, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'PUT', body, options)

export const deleteJson = async <TData>(url: string, body?: { [key: string]: any }, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'DELETE', body, options)
