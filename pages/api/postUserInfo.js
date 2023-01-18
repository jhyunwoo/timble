import prisma from "../../lib/prismadb"
import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getUserNullData(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const { post, userEmail, data } = req.body
    if (post === "schoolId") {
      const postSchool = await prisma.school.update({
        where: {
          code: data,
        },
        data: {
          students: {
            connect: {
              email: userEmail,
            },
          },
        },
      })
      res.status(200)
    } else if (post === "diploma") {
      const postDiploma = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          diploma: data,
        },
      })
      res.status(200)
    } else if (post === "year") {
      const postYear = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          year: data,
        },
      })
      res.status(200)
    } else if (post === "name") {
      const postName = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          name: data,
        },
      })
      res.status(200)
    }
  } else {
    res.status(403).json({
      message:
        "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
