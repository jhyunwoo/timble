import prisma from "../../../lib/prismadb"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const { code } = req.query
    if (code) {
      if (req.method === "GET") {
        if (session.user.school.code === code) {
          const getSchool = await prisma.school.findUnique({
            where: {
              code: code,
            },
          })
          res.status(200).json(getSchool)
        } else {
          res.status(400)
        }
      }
    } else {
      if (req.method === "GET") {
        const getSchools = await prisma.school.findMany()
        res.status(200).json(getSchools)
      }
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
