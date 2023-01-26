import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "GET") {
      if (id) {
        const getTypeById = await prisma.subjectType.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json(getTypeById)
      } else {
        const getTypes = await prisma.subjectType.findMany()
        res.status(200).json(getTypes)
      }
    } else if (req.method === "PUT") {
      const { data } = req.body
      const putTypeById = await prisma.subjectType.update({
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
      const postTypeById = await prisma.subjectType.create({
        data: {
          name: data.name,
          school: {
            connect: {
              code: data.code,
            },
          },
        },
      })
      res.status(200)
    } else if (req.method === "DELETE") {
      const deleteTypeById = await prisma.subjectType.delete({
        where: {
          id: id,
        },
      })
    }
    res.status(204)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
