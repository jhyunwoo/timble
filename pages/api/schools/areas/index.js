import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
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
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
