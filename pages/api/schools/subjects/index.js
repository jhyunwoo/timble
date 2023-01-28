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
    } else if (req.method === "PUT") {
      const { data } = req.body
      let csatVar
      if (data.csat === 0) {
        csatVar = false
      } else if (data.csat === 1) csatVar = true

      const createSubject = await prisma.subject.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          open: data.open,
          type: {
            connect: {
              id: data.type,
            },
          },
          target: data.target,
          relatedMajor: data.relatedMajor,
          area: {
            connect: {
              id: data.area,
            },
          },
          targetParticipants: data.targetParticipants,
          CSATSubject: csatVar,
          difficulty: {
            connect: {
              id: data.difficulty,
            },
          },
          school: {
            connect: {
              code: data.code,
            },
          },
          studentgroup: {
            connect: {
              id: data.group,
            },
          },
        },
      })

      let connectDiploma = []
      data.diplomaId.map((data) => {
        connectDiploma.push({ id: data })
      })

      const disconnectAll = await prisma.subject.update({
        where: {
          id: createSubject.id,
        },
        data: {
          diplomas: {
            set: [],
          },
        },
      })
      const linkDiploma = await prisma.subject.update({
        where: {
          id: createSubject.id,
        },
        data: {
          diplomas: {
            connect: connectDiploma,
          },
        },
      })

      const disconnectAllContents = await prisma.subject.update({
        where: {
          id: createSubject.id,
        },
        data: {
          contents: {
            set: [],
          },
        },
      })
      data.contents.map(async (data, key) => {
        let splitContentMainTarget
        splitContentMainTarget = data.mainTarget.split("/")
        if (data.id === "newContent") {
          const createContent = await prisma.subjectcontent.create({
            data: {
              area: data.area,
              mainTarget: splitContentMainTarget,
              detail: data.detail,
              order: key + 1,
            },
          })
          const linkSubjectContent = await prisma.subject.update({
            where: {
              id: createSubject.id,
            },
            data: {
              contents: {
                connect: {
                  id: createContent.id,
                },
              },
            },
          })
        } else {
          const updateSubjectContent = await prisma.subjectcontent.update({
            where: {
              id: data.id,
            },
            data: {
              area: data.area,
              mainTarget: splitContentMainTarget,
              detail: data.detail,
            },
          })
          const linkSubjectContent = await prisma.subject.update({
            where: {
              id: createSubject.id,
            },
            data: {
              contents: {
                connect: {
                  id: updateSubjectContent.id,
                },
              },
            },
          })
        }
      })

      data.prerequisite.map(async (data) => {
        const linkPrerequisite = await prisma.subject.update({
          where: {
            id: createSubject.id,
          },
          data: {
            prerequisite: {
              connect: {
                id: data,
              },
            },
          },
        })
      })
      res.status(200)
    } else if (req.method === "POST") {
      const { data } = req.body
      let csatVar
      if (data.csat === 0) {
        csatVar = false
      } else if (data.csat === 1) {
        csatVar = true
      }

      const createSubject = await prisma.subject.create({
        data: {
          title: data.title,
          open: data.open,
          type: {
            connect: {
              id: data.type,
            },
          },
          target: data.target,
          relatedMajor: data.relatedMajor,
          area: {
            connect: {
              id: data.area,
            },
          },
          targetParticipants: data.targetParticipants,
          CSATSubject: csatVar,
          difficulty: {
            connect: {
              id: data.difficulty,
            },
          },
          school: {
            connect: {
              code: data.code,
            },
          },
          studentgroup: {
            connect: {
              id: data.group,
            },
          },
        },
      })

      data.diplomaId.map(async (data) => {
        const linkDiploma = await prisma.subject.update({
          where: {
            id: createSubject.id,
          },
          data: {
            diplomas: {
              connect: {
                id: data,
              },
            },
          },
        })
      })

      data.contents.map(async (data, key) => {
        let splitContentMainTarget
        splitContentMainTarget = data.mainTarget.split("/")
        const createSubjectContent = await prisma.subjectcontent.create({
          data: {
            order: key,
            area: data.area,
            mainTarget: splitContentMainTarget,
            detail: data.detail,
          },
        })
        const linkSubjectContent = await prisma.subject.update({
          where: {
            id: createSubject.id,
          },
          data: {
            contents: {
              connect: {
                id: createSubjectContent.id,
              },
            },
          },
        })
      })
      data.prerequisite.map(async (data) => {
        const linkPrerequisite = await prisma.subject.update({
          where: {
            id: createSubject.id,
          },
          data: {
            prerequisite: {
              connect: {
                id: data,
              },
            },
          },
        })
      })
      res.status(200)
    } else if (req.method === "DELETE") {
      const disconnectSubject = await prisma.subject.update({
        where: {
          id: id,
        },
        data: {
          diplomas: {
            set: [],
          },
          prerequisite: {
            set: [],
          },
          prerequisiteRelation: {
            set: [],
          },
          difficulty: {
            disconnect: true,
          },
          area: {
            disconnect: true,
          },
          type: {
            disconnect: true,
          },
          contents: {
            deleteMany: {},
          },
          periods: {
            set: [],
          },
          studentgroup: {
            disconnect: true,
          },
        },
      })
      const deleteSubjectById = await prisma.subject.delete({
        where: {
          id: id,
        },
      })
      res.status(204)
    }
  } else {
    res.status(401).json({
      message: "You must be sign in to view the protected content on this page.",
    })
  }
  res.end()
}
