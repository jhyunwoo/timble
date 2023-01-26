import prisma from "../../../lib/prismadb"
import { authOptions } from "../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "PUT") {
      const { data } = req.body
      const updateUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: data,
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
}
