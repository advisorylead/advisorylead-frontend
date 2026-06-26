const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function apiRequest(path, options = {}) {
  const token =
    localStorage.getItem('adminToken') ||
    localStorage.getItem('contractorToken')

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Request failed')
  }

  const contentType = res.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return res.json()
  }

  return res.text()
}