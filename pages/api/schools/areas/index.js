import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "GET") {
      if (id) {
        const getAreaById = await prisma.subjectArea.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json(getAreaById)
      } else {
        const getAreas = await prisma.subjectArea.findMany()
        res.status(200).json(getAreas)
      }
    } else if (req.method === "PUT") {
      const { data } = req.body
      const putAreaById = await prisma.subjectArea.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
        },
      })
      res.status(200)
    } else if (req.method === "POST") {
      const { data } = req.body
      const postAreaById = await prisma.subjectArea.create({
        data: {
          name: data.name,
          school: {
            connect: {
              code: data.code,
            },
          },
        },
      })
      res.status(201)
    } else if (req.method === "DELETE") {
      const disconnectArea = await prisma.subjectArea.update({
        where: {
          id: id,
        },
        data: {
          subject: {
            set: [],
          },
        },
      })
      const deleteAreaById = await prisma.subjectArea.delete({
        where: {
          id: id,
        },
      })
      res.status(204)
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
