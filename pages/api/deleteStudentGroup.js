import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function deleteStudentGroup(req, res) {
  const { data } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const update = await prisma.studentgroup.delete({
      where: {
        id: data.id,
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
