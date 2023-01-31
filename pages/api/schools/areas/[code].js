import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    if (req.method === "GET") {
      const { code } = req.query

      const getAreaByCode = await prisma.subjectArea.findMany({
        where: {
          school: {
            code: code,
          },
        },
        orderBy: {
          id: "asc",
        },
      })
      res.status(200).json(getAreaByCode)
    } else {
      res.status(401).json({
        message: "You must be sign in to view the protected content on this page.",
      })
    }
    res.end()
  }
}
