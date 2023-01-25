import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function getGroup(req, res) {
  const { groupId } = req.body
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const groupInfo = await prisma.studentgroup.findUnique({
      where: {
        id: groupId,
      },
    })
    res.json(groupInfo)
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
