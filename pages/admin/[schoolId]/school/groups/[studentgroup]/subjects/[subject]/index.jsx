import { useRouter } from "next/router"
import useSchool from "../../../../../../../../lib/client/useSchool"
import ProtectedPage from "../../../../../../../../components/ProtectedPage"
import { useEffect } from "react"
import Link from "next/link"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import MoveBack from "../../../../../../../../components/moveBack"
import useSubject from "../../../../../../../../lib/client/useSubject"
import { mutate } from "swr"

export default function Subject() {
  const router = useRouter()
  const { school } = useSchool()
  const { subject } = useSubject(subjectID())
  function subjectID() {
    let id = router.asPath.replace("/admin/cnsa/school/groups/", "")
    id = id.replace("/subjects/", "")
    id = id.substr(25)
    return id
  }
  function getGroupId() {
    let path = router.asPath
    path = path.replace("/admin/cnsa/school/groups/", "")
    path = path.replace("/subjects/", "")
    path = path.substr(0, 25)
    return path
  }
  function updateData() {
    function mutateData() {
      mutate([subjectID() ? "/api/getSubject" : null, subjectID() ? subjectID() : null])
    }
    setTimeout(mutateData, 2000)
  }
  function BasicInfo(props) {
    return (
      <div className="bg-white p-4 rounded-lg">
        <div className="text-xl font-semibold my-2">{props.title}</div>
        <p className="font-medium text-md">{props.content}</p>
      </div>
    )
  }

  useEffect(() => {
    updateData()
  }, [router])

  return (
    <ProtectedPage>
      <MoveBack
        title={"교과목"}
        link={`/admin/${school ? school.code : null}/school/groups/${getGroupId()}/subjects`}
      />

      {subject ? (
        <div className="p-4 grid grid-cols-1 gap-4 -mt-4">
          <div className="text-2xl font-bold m-2 flex justify-between items-center">
            <div>{subject.title}</div>
            <Link
              href={`/admin/${school ? school.code : null}/school/groups/${getGroupId()}/subjects/${subjectID()}/edit`}
              className="bg-slate-100 flex justify-center items-center rounded-lg w-10 h-10 hover:bg-slate-200 transition duration-200"
            >
              <PencilSquareIcon className="w-8 h-8" />
            </Link>
          </div>
          <BasicInfo title={"목표"} content={subject.target} />
          <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold my-1 mb-3">디플로마</div>
            <div className="grid grid-cols-2 gap-2">
              {subject.diplomas
                ? subject.diplomas.map((data, key) => (
                    <div key={key} className="bg-slate-100 rounded-lg text-center p-1 px-2 font-semibold">
                      {data.name}
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <BasicInfo title={"수강 대상"} content={subject.targetParticipants} />
          <BasicInfo title={"관련 진로"} content={subject.relatedMajor} />
          <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold my-1">선수 과목</div>
            <div className="grid grid-cols-2 gap-2">
              {subject.prerequisite
                ? subject.prerequisite.map((data, key) => (
                    <div key={key} className="p-1 px-2 bg-slate-100 text-center rounded-lg font-semibold">
                      {data.title}
                    </div>
                  ))
                : ""}
              {subject.prerequisite ? (
                subject.prerequisite.length === 0 ? (
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
              {subject.difficulty ? subject.difficulty.name : ""}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col">
            <div className="text-xl font-semibold my-1">교과 유형</div>
            <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
              {subject.type ? subject.type.name : ""}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col">
            <div className="text-xl font-semibold my-1">교과 영역</div>
            <p className="font-semibold m-2 bg-slate-100 rounded-lg text-center p-2 px-8">
              {subject.area ? subject.area.name : ""}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold my-1 mb-3">개설 학기</div>
            <div className="grid grid-cols-3 gap-2">
              {subject.open
                ? subject.open.sort().map((data, key) => (
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
              {subject.CSATSubject ? "예" : "아니요"}
            </p>
          </div>
          <div className="bg-white rounded-lg flex flex-col p-2">
            <div className="text-xl font-semibold m-4">내용 체계</div>
            <div className="grid grid-cols-1 gap-2">
              {subject.contents
                ? subject.contents.map((data, key) => (
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
      ) : (
        ""
      )}
    </ProtectedPage>
  )
}
