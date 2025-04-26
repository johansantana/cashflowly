import { NextResponse } from 'next/server'
import { setToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!process.env.API_URL) {
      console.error('API_URL environment variable is not set')
      return NextResponse.json({ message: 'Error de configuración del servidor' }, { status: 500 })
    }

    console.log('Making request to:', `${process.env.API_URL}/api/usuarios/login`)
    console.log('Request body:', body)

    const response = await fetch(`${process.env.API_URL}/api/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log('API Response:', data)

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Error al iniciar sesión' },
        { status: response.status }
      )
    }

    // Set the token in a cookie
    await setToken(data.token)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Proxy error:', err)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
