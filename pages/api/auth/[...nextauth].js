import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import NaverProvider from "next-auth/providers/naver"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async session(session) {
      let userData = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          studentgroup: true,
          school: true,
          diploma: true,
        },
      })
      session.user.school = userData.school
      session.user.diploma = userData.diploma
      session.user.studentgroup = userData.studentgroup
      return session
    },
  },
}

export default NextAuth(authOptions)
