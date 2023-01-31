import prisma from "../../../../../lib/prismadb"
import { authOptions } from "../../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { id, code } = req.query
    if (req.method === "GET") {
      try {
        if (session.user.school.code === code) {
          const getSubjects = await prisma.subject.findMany({
            where: {
              school: {
                code: code,
              },
              studentgroup: {
                id: id,
              },
            },
            include: {
              school: true,
              diplomas: true,
              prerequisite: true,
              difficulty: true,
              area: true,
              type: true,
              contents: true,
              studentgroup: true,
            },
            orderBy: {
              id: "asc",
            },
          })
          res.status(200).json(getSubjects)
        } else {
          res.status(400)
        }
      } catch {
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
