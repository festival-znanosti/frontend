const JSON_HEADER = {
  'Content-Type': 'application/json',
}

export type BaseJsonOptions = RequestInit

export type ApiResponse<TData = unknown> = {
  status: 'error' | 'success'
  message: string
  data?: TData
}

async function handleResponse<TData>(res: Response): Promise<ApiResponse<TData>> {
  const data = await res.json()

  if (res.ok) {
    return {
      status: 'success',
      message: data?.message ?? '',
      data,
    }
  }

  return {
    status: 'error',
    message: data?.message ?? '',
  }
}

async function sendRequest<TData>(
  url: string,
  method: string,
  body = {},
  options: BaseJsonOptions = {}
): Promise<ApiResponse<TData>> {
  const { headers, ...fetchOptions } = options

  const res = await fetch(url, {
    method,
    ...fetchOptions,
    body: JSON.stringify({ ...body }),
    headers: {
      ...JSON_HEADER,
      ...headers,
    },
  })

  return await handleResponse<TData>(res)
}

export const getJson = async <TData>(url: string, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'GET', undefined, options)

export const postJson = async <TData>(url: string, body = {}, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'POST', body, options)

export const putJson = async <TData>(url: string, body = {}, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'PUT', body, options)

export const deleteJson = async <TData>(url: string, options: BaseJsonOptions = {}) =>
  sendRequest<TData>(url, 'DELETE', undefined, options)
