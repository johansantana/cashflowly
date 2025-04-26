import { NextResponse } from 'next/server'
import { removeToken } from '@/lib/auth'

export async function POST() {
  try {
    await removeToken()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json({ success: false, message: 'Error during logout' }, { status: 500 })
  }
}
