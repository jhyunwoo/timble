import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { code } = req.query
    if (req.method === "GET") {
      if (session.user.school.code === code) {
        const getGroups = await prisma.studentgroup.findMany({
          where: {
            school: {
              code: code,
            },
          },
          orderBy: {
            entrance: "desc",
          },
        })
        res.status(200).json(getGroups)
      } else {
        res.status(400)
      }
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
