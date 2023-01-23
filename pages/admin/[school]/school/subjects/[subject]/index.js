import { useRouter } from "next/router"
import useSchool from "../../../../../../lib/client/useSchool"
import ProtectedPage from "../../../../../../components/ProtectedPage"
import useSubjects from "../../../../../../lib/client/useSubjects"
import { useEffect, useState } from "react"
import {
  translateSubjectArea,
  translateSubjectType,
  translateSubjectDifficulty,
} from "../../../../../../lib/client/translateSubject"
import Link from "next/link"
import useUser from "../../../../../../lib/client/useUser"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Subject() {
  const router = useRouter()
  const { code } = useSchool()
  const { subjects } = useSubjects()
  const [subjectInfo, setSubjectInfo] = useState({})
  const { user } = useUser()

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
        <div className="text-xl font-semibold my-2">{props.title}</div>
        <p className="font-medium text-md">{props.content}</p>
      </div>
    )
  }

  return (
    <ProtectedPage>
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="text-2xl font-bold m-2 flex justify-between items-center">
          <div>{subjectInfo.title}</div>
          <Link
            href={`/admin/${user ? user.admin : null}/school/subjects/${subjectInfo.id}/edit`}
            className="bg-slate-100 flex justify-center items-center rounded-lg w-10 h-10 hover:bg-slate-200 transition duration-200"
          >
            <PencilSquareIcon className="w-8 h-8" />
          </Link>
        </div>
        <BasicInfo title={"목표"} content={subjectInfo.target} />
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl font-semibold my-1 mb-3">디플로마</div>
          <div className="grid grid-cols-2 gap-2">
            {subjectInfo.diplomas
              ? subjectInfo.diplomas.map((data, key) => (
                  <div key={key} className="bg-slate-100 rounded-lg text-center p-1 px-2 font-semibold">
                    {data.name}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <BasicInfo title={"수강 대상"} content={subjectInfo.targetParticipants} />
        <BasicInfo title={"관련 진로"} content={subjectInfo.relatedMajor} />
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl font-semibold my-1">선수 과목</div>
          <div className="grid grid-cols-2 gap-2">
            {subjectInfo.prerequisite
              ? subjectInfo.prerequisite.map((data, key) => (
                  <div key={key} className="p-1 px-2 bg-slate-100 text-center rounded-lg font-semibold">
                    {data.title}
                  </div>
                ))
              : ""}
            {subjectInfo.prerequisite ? (
              subjectInfo.prerequisite.length === 0 ? (
                <div className="font-semibold m-2 col-span-2 bg-slate-100 rounded-lg text-center p-2 px-8">없음</div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <div className="text-xl font-semibold my-1">교과 난이도</div>
          <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
            {subjectInfo.difficulty ? translateSubjectDifficulty(subjectInfo.difficulty) : ""}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <div className="text-xl font-semibold my-1">교과 유형</div>
          <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
            {subjectInfo.type ? translateSubjectType(subjectInfo.type) : ""}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <div className="text-xl font-semibold my-1">교과 영역</div>
          <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
            {subjectInfo.subjectArea ? translateSubjectArea(subjectInfo.subjectArea) : ""}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl font-semibold my-1 mb-3">개설 학기</div>
          <div className="grid grid-cols-3 gap-2">
            {subjectInfo.open
              ? subjectInfo.open.sort().map((data, key) => (
                  <div key={key} className="p-1 px-2 bg-slate-100 text-center rounded-lg font-semibold">
                    {data}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <div className="text-xl font-semibold my-1">수능 과목 여부</div>
          <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
            {subjectInfo.CSATSubject ? "예" : "아니요"}
          </p>
        </div>
        <div className="bg-white rounded-lg flex flex-col">
          <div className="text-xl font-semibold m-4">내용 체계</div>
          <div className="grid grid-cols-1 gap-2">
            {subjectInfo.content
              ? subjectInfo.content.map((data, key) => (
                  <div key={key} className="bg-slate-100 p-2 rounded-lg grid grid-cols-1 gap-2">
                    <div className="flex flex-col bg-white rounded-md p-2">
                      <div className="text-lg font-semibold">영역</div>
                      <div className="text-md">{data.area}</div>
                    </div>
                    <div className="flex flex-col bg-white rounded-md p-2">
                      <div className="text-lg font-semibold">핵심 개념</div>
                      {data.mainTarget.map((data, key) => (
                        <div className="text-md" key={key}>
                          • {data}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col bg-white rounded-md p-2">
                      <div className="text-lg font-semibold">내용 요소</div>
                      <div className="text-md">{data.detail}</div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}
