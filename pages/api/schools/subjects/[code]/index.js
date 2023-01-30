import prisma from "../../../../../lib/prismadb"
import { authOptions } from "../../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export const config = {
  runtime: "edge",
  unstable_allowDynamic: [
    "/lib/utilities.js", // allows a single file
    "/node_modules/function-bind/**", // use a glob to allow anything in the function-bind 3rd party module
  ],
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { code } = req.query
    if (req.method === "GET") {
      try {
        if (session.user.school.code === code) {
          const getSubjects = await prisma.subject.findMany({
            where: {
              school: {
                code: code,
              },
            },
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
            orderBy: {
              id: "asc",
            },
          })
          // res.status(200).json(getSubjects)
          return new Response(JSON.stringify(getSubjects), { status: 200 })
        } else {
          // res.status(400)
          return new Response({ status: 200 })
        }
      } catch {
        // res.status(400)
        return new Response({ status: 400 })
      }
    }
  } else {
    return new Response({ status: 401 })
    // res.status(401).json({
    //   message: "You must be sign in to view the protected content on this page.",
    // })
  }
}
