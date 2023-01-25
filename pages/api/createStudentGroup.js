import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function createStudentGroup(req, res) {
  const { data } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const create = await prisma.studentgroup.create({
      data: {
        name: data.name,
        entrance: data.entrance,
        school: {
          connect: {
            id: data.schoolId,
          },
        },
      },
    })
    res.status(200)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
