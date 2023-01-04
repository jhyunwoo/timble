import prisma from "../../lib/prismadb"
import { getSession } from "next-auth/react"

export default async function getUserNullData(req, res) {
  const { userEmail } = req.body
  const session = await getSession({ req })

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
    res.status(403).json({
      message:
        "You must be sign in to view the protected content on this page.",
    })
  }
}
