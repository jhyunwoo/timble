import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getSubjects(req, res) {
  const { schoolId } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const schoolSubject = await prisma.subject.findMany({
      where: {
        schoolId: schoolId,
      },
      include: {
        prerequisite: true,
        content: {
          orderBy: {
            order: "asc",
          },
        },
        diplomas: true,
      },
    })
    res.json(schoolSubject)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
