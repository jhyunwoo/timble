import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getSubjects(req, res) {
  const { subjectId } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const subject = await prisma.subject.findUnique({
      where: {
        id: subjectId,
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
    res.json(subject)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
