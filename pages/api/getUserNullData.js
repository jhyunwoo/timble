import prisma from "../../lib/prismadb"

export default async function getUserNullData(req, res) {
  const { userEmail } = req.body
  if (userEmail) {
    const userInfo = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    })
    const keys = Object.keys(userInfo)
    let nullData = []
    keys.map((key) => {
      if (!userInfo[key]) {
        nullData.push(key)
      }
    })
    nullData = nullData.filter((element) => element !== "emailVerified")
    res.json(nullData)
  }
}
