import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getUserInfo(req, res) {
  const { userEmail } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const userInfo = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        diploma: {
          disconnect: true,
        },
        year: null,
        School: {
          disconnect: true,
        },
      },
    })
    res.json(userInfo)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
