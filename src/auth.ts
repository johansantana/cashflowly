import NextAuth, { DefaultSession, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getToken, setToken } from '@/lib/auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
  }
}

interface Credentials {
  email: string
  password: string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const response = await fetch('/api/Usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!response.ok) return null

          const data = await response.json()
          await setToken(data.token)
          return data
        } catch (error) {
          console.error('Error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: User | null }) {
      if (user) {
        token.accessToken = await getToken()
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})
