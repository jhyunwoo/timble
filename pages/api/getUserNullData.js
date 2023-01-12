import prisma from "../../lib/prismadb"
import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getUserNullData(req, res) {
  const { userEmail } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    if (userEmail) {
      const userInfo = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      })
      const keys = Object.keys(userInfo)
      let nullData = []
      keys.map((key) => {
        if (!userInfo[key]) {
          nullData.push(key)
        }
      })
      nullData = nullData.filter((element) => element !== "emailVerified")
      res.json(nullData)
    }
  } else {
    res.status(401).json({
      message:
        "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
