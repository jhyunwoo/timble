import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "GET") {
      if (id) {
        const getEssentialById = await prisma.essential.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json(getEssentialById)
      } else {
        const getEssentials = await prisma.essential.findMany()
        res.status(200).json(getEssentials)
      }
    } else if (req.method === "DELETE") {
      const deleteEssentialById = await prisma.essential.delete({
        where: {
          id: id,
        },
      })
      res.status(204)
    } else if (req.method === "PUT") {
      const { data } = req.body
      const disconnectEssential = await prisma.essential.update({
        where: {
          id: id,
        },
        data: {
          subjects: {
            set: [],
          },
        },
      })
      const putEssential = await prisma.essential.update({
        where: {
          id: id,
        },
        data: {
          group: {
            connect: {
              id: data.groupId,
            },
          },
          subjects: {
            connect: data.subjects,
          },
          semester: data.semester,
        },
      })
      res.status(200)
    } else if (req.method === "POST") {
      const { data } = req.body
      const postEssential = await prisma.essential.create({
        data: {
          group: {
            connect: {
              id: data.groupId,
            },
          },
          subjects: {
            connect: data.subjects,
          },
          semester: data.semester,
        },
      })
    }
    res.status(201)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
