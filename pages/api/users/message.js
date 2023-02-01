import prisma from "../../../lib/prismadb"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { id } = req.query
    if (req.method === "PUT") {
      const { data } = req.body
      const getMessageTocken = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          messagetocken: true,
        },
      })
      let tockenList = getMessageTocken.messagetocken
      if (!tockenList.includes(data.message)) {
        tockenList.push(data.message)

        const updateUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            messagetocken: tockenList,
          },
        })
      }

      res.status(200)
    } else {
      res.status(401).json({
        message: "You must be sign in to view the protected content on this page.",
      })
    }
    res.end()
  }
}
