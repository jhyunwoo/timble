import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getAllSchools(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const schoolInfo = await prisma.school.findMany({})
    res.json(schoolInfo)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
