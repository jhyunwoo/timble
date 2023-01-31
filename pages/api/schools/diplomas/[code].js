import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { code } = req.query
    if (req.method === "GET") {
      const getDiplomas = await prisma.diploma.findMany({
        where: {
          school: {
            code: code,
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          subjects: true,
          school: true,
          students: {
            select: {
              id: true,
              name: true,
              diploma: true,
              email: true,
              school: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      })
      res.status(200).json(getDiplomas)
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
