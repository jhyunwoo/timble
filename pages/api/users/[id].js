import prisma from "../../../lib/prismadb"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const { id } = req.query
    if (req.method === "PUT") {
      if (id === session.user.id) {
        const { data } = req.body
        const postUser = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            school: {
              connect: {
                code: data.code,
              },
            },
            studentgroup: {
              connect: {
                id: data.studentgroupId,
              },
            },
            diploma: {
              connect: {
                id: data.diplomaId,
              },
            },
          },
        })
        res.status(201)
      } else {
        res.status(401).json({
          message: "You must be sign in to view the protected content on this page.",
        })
      }
    } else if (req.method === "GET") {
      if (id === session.user.id) {
        const getUser = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          include: {
            school: true,
            studentgroup: true,
            diploma: true,
            timetable: true,
          },
        })
        res.status(200).json(getUser)
      } else {
        res.status(401).json({
          message: "You must be sign in to view the protected content on this page.",
        })
      }
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
