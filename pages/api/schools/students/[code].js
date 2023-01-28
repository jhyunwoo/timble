import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { code } = req.query
    if (req.method === "GET") {
      if (session.user.school.code === code) {
        const getStudents = await prisma.user.findMany({
          where: {
            school: {
              code: code,
            },
            role: "USER",
          },
          include: {
            school: true,
            studentgroup: true,
            diploma: true,
          },
          orderBy: {
            id: "asc",
          },
        })
        res.status(200).json(getStudents)
      } else {
        res.status(400)
      }
    } else {
      res.status(400)
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
