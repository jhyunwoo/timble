import prisma from '../../lib/prismadb'
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'

export default async function getSchool(req, res) {
  const { schoolId } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)
  console.log(schoolId)
  if (session) {
    try {
      const schoolInfo = await prisma.school.findUnique({
        where: {
          id: schoolId,
        },
        include: {
          subjects: {
            id: true,
            title: true,
            diplomaId: true,
            open: true,
            type: true,
            target: true,
            relatedMajor: true,
          },
          diplomas: {
            id: true,
            name: true,
            description: true,
          },
        },
      })
      console.log(schoolInfo)
      res.json(schoolInfo)
    } catch {
      res.status(501)
    }
  } else {
    res.status(401).json({
      message: 'You must be sign in to view the protected content on this page.',
    })
  }
  res.end()
}
