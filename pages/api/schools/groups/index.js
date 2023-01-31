import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "GET") {
      if (id) {
        const getGroupById = await prisma.studentgroup.findUnique({
          where: {
            id: id,
          },
          include: {
            essentials: {
              select: {
                id: true,
                group: true,
                semester: true,
                subjects: true,
              },
            },
          },
        })
        res.status(200).json(getGroupById)
      } else {
        const getGroups = await prisma.studentgroup.findMany()
        res.status(200).json(getGroups)
      }
    } else if (req.method === "DELETE") {
      const deleteGroupById = await prisma.studentgroup.delete({
        where: {
          id: id,
        },
      })
      res.status(204)
    } else if (req.method === "PUT") {
      const { data } = req.body
      const putGroup = await prisma.studentgroup.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          entrance: data.entrance,
        },
      })
      res.status(200)
    } else if (req.method === "POST") {
      const { data } = req.body
      const postGroup = await prisma.studentgroup.create({
        data: {
          name: data.name,
          entrance: data.entrance,
          school: {
            connect: {
              code: data.code,
            },
          },
        },
      })
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
