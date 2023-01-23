import { useRouter } from "next/router"
import useSchool from "../../../../../lib/client/useSchool"
import ProtectedPage from "../../../../../components/ProtectedPage"
import useSubjects from "../../../../../lib/client/useSubjects"
import { useEffect, useState } from "react"

export default function Subject() {
  const router = useRouter()
  const { code } = useSchool()
  const { subjects } = useSubjects()
  const [subjectInfo, setSubjectInfo] = useState({})

  function getSubjectInfo() {
    if (subjects && code) {
      let subjectId = router.asPath.replace(`/admin/${code}/school/subjects/`, "")
      subjects.map((data) => {
        if (data.id === Number(subjectId)) {
          setSubjectInfo(data)
        }
      })
    }
  }

  useEffect(() => {
    getSubjectInfo()
  }, [subjects, code, router])
  function BasicInfo(props) {
    return (
      <div className="bg-white p-4 rounded-lg">
        <div className="text-xl font-semibold my-1">{props.title}</div>
        <p>{props.content}</p>
      </div>
    )
  }

  return (
    <ProtectedPage>
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="text-2xl font-bold m-2">{subjectInfo.title}</div>
        <BasicInfo title={"목표"} content={subjectInfo.target} />
        <BasicInfo title={"수강 대상"} content={subjectInfo.targetParticipants} />
        <BasicInfo title={"관련 진로"} content={subjectInfo.relatedMajor} />
      </div>
    </ProtectedPage>
  )
}
