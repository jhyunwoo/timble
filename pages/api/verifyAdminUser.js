import prisma from "../../lib/prismadb"
import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function verifyAdminUser(req, res) {
  const { userEmail } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const userInfo = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    })
    res.json(userInfo.emailVerified)
  } else {
    res.status(401).json({
      message:
        "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
