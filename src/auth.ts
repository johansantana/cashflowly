import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { saltAndHashPassword } from '@/lib/utils'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        let user = null

        const pwHash = saltAndHashPassword(credentials.password as string)
        user = { id: '1', name: 'John Doe', email: credentials.email as string } // logic to check if user exists in database

        if (!user) {
          throw new Error('Credenciales Inválidas.')
        }
        return user
      }
    })
  ]
})
