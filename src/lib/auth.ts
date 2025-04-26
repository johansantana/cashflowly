import { cookies } from 'next/headers'

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export async function setToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  })
}

export async function removeToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export async function isAuthenticated() {
  return !!(await getToken())
}
