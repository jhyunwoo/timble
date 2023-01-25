import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getStudents(req, res) {
  const { schoolId } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const schoolStudents = await prisma.user.findMany({
      where: {
        schoolId: schoolId,
        role: "USER",
      },
      include: {
        diploma: true,
        studentgroup: true,
      },
    })
    res.json(schoolStudents)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
