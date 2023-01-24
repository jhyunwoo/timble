import prisma from "../../lib/prismadb"
import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export default async function AdminPost(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const { post } = req.body
    if (post === "adminDiplomaUpdate") {
      const { dataId, data } = req.body
      const updateDiploma = await prisma.diploma.update({
        where: {
          id: dataId,
        },
        data: {
          name: data.diplomaName,
          description: data.diplomaDescription,
        },
      })
      res.status(200)
    } else if (post === "adminDiplomaCreate") {
      const { data } = req.body
      const createDiploma = await prisma.diploma.create({
        data: {
          name: data.diplomaName,
          description: data.diplomaDescription,
          school: {
            connect: {
              id: data.schoolId,
            },
          },
        },
      })
      res.status(200)
    } else if (post === "adminPostSubject") {
      const {
        schoolId,
        title,
        type,
        diplomaId,
        area,
        csat,
        open,
        prerequisite,
        relatedMajor,
        target,
        targetParticipants,
        contents,
        difficulty,
      } = req.body
      let csatVar
      if (csat === 0) {
        csatVar = false
      } else if (csat === 1) csatVar = true

      const createSubject = await prisma.subject.create({
        data: {
          title: title,
          open: open,
          type: type,
          target: target,
          relatedMajor: relatedMajor,
          subjectArea: area,
          targetParticipants: targetParticipants,
          CSATSubject: csatVar,
          difficulty: difficulty,
          School: {
            connect: {
              id: schoolId,
            },
          },
        },
      })

      diplomaId.map(async (data) => {
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

      contents.map(async (data, key) => {
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
            content: {
              connect: {
                id: createSubjectContent.id,
              },
            },
          },
        })
      })
      prerequisite.map(async (data) => {
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
    } else if (post === "adminUpdateSubject") {
      const {
        id,
        schoolId,
        title,
        type,
        diplomaId,
        area,
        csat,
        open,
        prerequisite,
        relatedMajor,
        target,
        targetParticipants,
        contents,
        difficulty,
      } = req.body
      let csatVar
      if (csat === 0) {
        csatVar = false
      } else if (csat === 1) csatVar = true

      const createSubject = await prisma.subject.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          open: open,
          type: type,
          target: target,
          relatedMajor: relatedMajor,
          subjectArea: area,
          targetParticipants: targetParticipants,
          CSATSubject: csatVar,
          difficulty: difficulty,
          School: {
            connect: {
              id: schoolId,
            },
          },
        },
      })

      let connectDiploma = []
      diplomaId.map((data) => {
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

      contents.map(async (data, key) => {
        let splitContentMainTarget
        splitContentMainTarget = data.mainTarget.split("/")
        const createSubjectContent = await prisma.subjectcontent.update({
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
            content: {
              connect: {
                id: createSubjectContent.id,
              },
            },
          },
        })
      })
      prerequisite.map(async (data) => {
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
    } else if (post === "adminDeleteSubject") {
      const { id } = req.body
      const deleteRelatedRecord = await prisma.subject.update({
        where: {
          id: id,
        },
        data: {
          School: {
            disconnect: true,
          },
          diplomas: {
            set: [],
          },
          prerequisite: {
            set: [],
          },
          prerequisiteRelation: {
            set: [],
          },
          content: {
            deleteMany: {},
          },
        },
      })
      const deleteSubject = await prisma.subject.delete({
        where: {
          id: id,
        },
      })
      res.status(200)
    } else if (post === "adminDiplomaDelete") {
      const { dataId } = req.body
      const disconnectDiploma = await prisma.diploma.update({
        where: {
          id: dataId,
        },
        data: {
          subjects: {
            set: [],
          },
          school: {
            disconnect: true,
          },
          students: {
            set: [],
          },
        },
      })
      const deleteDiploma = await prisma.diploma.delete({
        where: {
          id: dataId,
        },
      })
      res.status(200)
    } else if (post === "adminSubjectAreaUpdate") {
      const { data, dataId } = req.body
      const updateSubjectArea = await prisma.subjectArea.update({
        where: {
          id: dataId,
        },
        data: {
          name: data.areaName,
        },
      })
      res.status(200)
    } else if (post === "adminSubjectAreaDelete") {
      const { dataId } = req.body
      const disconnectSubjectArea = await prisma.subjectArea.update({
        where: {
          id: dataId,
        },
        data: {
          Subject: {
            set: [],
          },
        },
      })
      const deleteSubjectArea = await prisma.subjectArea.delete({
        where: {
          id: dataId,
        },
      })
      res.status(200)
    } else if (post === "adminSubjectAreaCreate") {
      const { data } = req.body
      const createSubjectArea = await prisma.subjectArea.create({
        data: {
          name: data.areaName,
          school: {
            connect: {
              id: data.schoolId,
            },
          },
        },
      })
      res.status(200)
    } else if (post === "adminSubjectTypeUpdate") {
      const { data, dataId } = req.body
      const updateSubjectType = await prisma.subjectType.update({
        where: {
          id: dataId,
        },
        data: {
          name: data.typeName,
        },
      })
      res.status(200)
    } else if (post === "adminSubjectTypeDelete") {
      const { dataId } = req.body
      const disconnectSubjectType = await prisma.subjectType.update({
        where: {
          id: dataId,
        },
        data: {
          Subject: {
            set: [],
          },
        },
      })
      const deleteSubjectType = await prisma.subjectType.delete({
        where: {
          id: dataId,
        },
      })
      res.status(200)
    } else if (post === "adminSubjectTypeCreate") {
      const { data } = req.body
      const createSubjectType = await prisma.subjectType.create({
        data: {
          name: data.typeName,
          school: {
            connect: {
              id: data.schoolId,
            },
          },
        },
      })
      res.status(200)
    } else if (post === "adminDifficultyUpdate") {
      const { data, dataId } = req.body
      const updateDifficulty = await prisma.difficulty.update({
        where: {
          id: dataId,
        },
        data: {
          name: data.difficultyName,
        },
      })
      res.status(200)
    } else if (post === "adminDifficultyDelete") {
      const { dataId } = req.body
      const disconnectDifficulty = await prisma.difficulty.update({
        where: {
          id: dataId,
        },
        data: {
          Subject: {
            set: [],
          },
        },
      })
      const deleteDifficulty = await prisma.difficulty.delete({
        where: {
          id: dataId,
        },
      })
      res.status(200)
    } else if (post === "adminDifficultyCreate") {
      const { data } = req.body
      const createDifficulty = await prisma.difficulty.create({
        data: {
          name: data.difficultyName,
          school: {
            connect: {
              id: data.schoolId,
            },
          },
        },
      })
      res.status(200)
    } else {
      res.status(403).json({
        message: "You must be sign in to view the protected content on this page.",
      })
    }
    res.end()
  }
}
