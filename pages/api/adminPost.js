import prisma from "../../lib/prismadb"
import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function AdminPost(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const { post, dataId, dataType, data } = req.body
    if (post === "adminDiplomaUpdate") {
      const updateDiploma = await prisma.diploma.update({
        where: {
          id: dataId,
        },
        data: {
          name: data.diplomaName,
          description: data.diplomaDescription,
        },
      })
      res.status(200)
    } else if (post === "adminDiplomaCreate") {
      const createDiploma = await prisma.diploma.create({
        data: {
          name: data.diplomaName,
          description: data.diplomaDescription,
          school: {
            connect: {
              id: data.schoolId,
            },
          },
        },
      })
      res.status(200)
    } else {
      res.status(403).json({
        message:
          "You must be sign in to view the protected content on this page.",
      })
    }
    res.end()
  }
}
