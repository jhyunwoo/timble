import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const { id } = req.query
        if (req.method === "GET") {
            if (id) {
                const getDiplomaById = await prisma.diploma.findUnique({
                    where: {
                        id: id,
                    },
                    select:{
                        id:true,
                        name:true,
                        description:true,
                        subjects:true,
                        school:true,
                        students:{
                            select:{
                                id:true,
                                name:true,
                                diploma:true,
                                email:true,
                                school:true
                            }
                        }
                    }
                })
                res.status(200).json(getDiplomaById)
            } else {
                const getDiplomas = await prisma.diploma.findMany({
                    select:{
                        id:true,
                        name:true,
                        description:true,
                        subjects:true,
                        school:true,
                        students:{
                            select:{
                                id:true,
                                name:true,
                                diploma:true,
                                email:true,
                                school:true
                            }
                        }
                    }
                })
                res.status(200).json(getDiplomas)
            }
        }
    } else {
        res.status(401).json({
            message: "You must be sign in to view the protected content on this page.",
        })
    }
    res.end()
}
