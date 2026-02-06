import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        uid: { label: 'UID', type: 'text', placeholder: 'u123456' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.uid || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { uid: credentials.uid },
        })

        if (!user) {
          return null
        }

        // In a real app, verify password hash
        if (user.password !== credentials.password) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.uid, // Using UID as email/identifier
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.uid = user.email
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).uid = token.uid;
        (session.user as any).role = token.role;
      }
      return session
    },
  },
}
