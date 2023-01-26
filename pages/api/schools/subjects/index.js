import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "GET") {
      if (id) {
        const getSubjectById = await prisma.subject.findUnique({
          where: {
            id: id,
          },
<<<<<<< HEAD
          include: {
            school: true,
            diplomas: true,
            prerequisite: true,
            difficulty: true,
            area: true,
            type: true,
            contents: true,
            studentgroup: true,
          },
=======
>>>>>>> origin/main
        })
        res.status(200).json(getSubjectById)
      } else {
        const getSubjects = await prisma.subject.findMany({
          include: {
            school: true,
            diplomas: true,
            prerequisite: true,
            difficulty: true,
            area: true,
            type: true,
            contents: true,
            studentgroup: true,
          },
        })
        res.status(200).json(getSubjects)
      }
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
