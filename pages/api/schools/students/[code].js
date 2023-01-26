import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const { code } = req.query
        if (req.method === "GET") {
            const getSubjects = await prisma.user.findMany({
                where: {
                    school: {
                        code: code,
                    },
                },
                include:{
                    school:true,
                    studentgroup:true,
                    diploma:true
                }
            })
            console.log(session)
            res.status(200).json(getSubjects)
        }
    } else {
        res.status(401).json({
            message: "You must be sign in to view the protected content on this page.",
        })
    }
    res.end()
}
