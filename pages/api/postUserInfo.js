import prisma from "../../lib/prismadb"
import { getSession } from "next-auth/react"

export default async function getUserNullData(req, res) {
  const session = await getSession({ req })

  if (session) {
    const { post, userEmail, data } = req.body
    if (post === "school") {
      const postSchool = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          school: data,
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
}
