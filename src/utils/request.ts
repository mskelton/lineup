async function baseRequest<T>(
  method: string,
  url: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
    method,
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} with status ${res.status}.`)
  }

  if (method !== "DELETE") {
    return res.json()
  } else {
    return null as T
  }
}

export const request = {
  delete: <T>(url: string) => baseRequest<T>("DELETE", url),
  get: <T>(url: string) => baseRequest<T>("GET", url),
  patch: <T>(url: string, body: unknown) => baseRequest<T>("PATCH", url, body),
  post: <T>(url: string, body: unknown) => baseRequest<T>("POST", url, body),
  put: <T>(url: string, body: unknown) => baseRequest<T>("PUT", url, body),
}
