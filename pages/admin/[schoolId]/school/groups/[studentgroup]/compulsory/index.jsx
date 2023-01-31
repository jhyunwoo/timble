import { useRouter } from "next/router"
import MoveBack from "../../../../../../../components/MoveBack"
import ProtectedPage from "../../../../../../../components/ProtectedPage"
import useGroup from "../../../../../../../lib/client/useGroup"
import Link from "next/dist/client/link"
import { useEffect, useState } from "react"

export default function CompulsorySubjects() {
  const router = useRouter()
  const { group } = useGroup(groupId())
  const [year1, setYear1] = useState([])
  const [year21, setYear21] = useState([])
  const [year22, setYear22] = useState([])
  const [year31, setYear31] = useState([])
  const [year32, setYear32] = useState([])

  function groupId() {
    return router.query.studentgroup
  }
  function schoolCode() {
    return router.query.schoolId
  }

  function yearEssential(year) {
    let essential
    if (group) {
      group.essentials.map((data) => {
        if (data.semester === year) {
          essential = data
        }
      })
    }
    return essential ? essential.subjects : null
  }

  useEffect(() => {
    setYear1(yearEssential("1"))
    setYear21(yearEssential("2-1"))
    setYear22(yearEssential("2-2"))
    setYear31(yearEssential("3-1"))
    setYear32(yearEssential("3-2"))
  }, [group])

  return (
    <ProtectedPage>
      <MoveBack title={group ? group.name : null} link={`/admin/${schoolCode()}/school/groups/${groupId()}`} />
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="text-xl font-semibold mx-2" onClick={() => console.log(year1)}>
          필수 이수 과목 설정
        </div>
        <Link
          href={`/admin/${schoolCode()}/school/groups/${groupId()}/compulsory/year1`}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="text-lg font-medium">1학년 필수 이수 과목</div>
          <div className="grid grid-cols-2 m-1 gap-2">
            {year1 ? (
              year1.map((data, key) => (
                <div key={key} className="bg-slate-100 p-2 text-center rounded-md">
                  {data.title}
                </div>
              ))
            ) : (
              <div className="bg-slate-100 p-2 text-center rounded-md col-span-2">미정</div>
            )}
          </div>
        </Link>
        <Link
          href={`/admin/${schoolCode()}/school/groups/${groupId()}/compulsory/year2`}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="text-lg font-medium">2학년 필수 이수 과목</div>
          <div className="m-1 mt-3">
            <div className="m-1">2학년 1학기</div>
            <div className="grid grid-cols-2 gap-2">
              {year21 ? (
                year21.map((data, key) => (
                  <div key={key} className="bg-slate-100 p-2 text-center rounded-md">
                    {data.title}
                  </div>
                ))
              ) : (
                <div className="bg-slate-100 p-2 text-center rounded-md col-span-2">미정</div>
              )}
            </div>
            <div className="m-1">2학년 2학기</div>
            <div className="grid grid-cols-2 gap-2">
              {year22 ? (
                year22.map((data, key) => (
                  <div key={key} className="bg-slate-100 p-2 text-center rounded-md">
                    {data.title}
                  </div>
                ))
              ) : (
                <div className="bg-slate-100 p-2 text-center rounded-md col-span-2">미정</div>
              )}
            </div>
          </div>
        </Link>
        <Link
          href={`/admin/${schoolCode()}/school/groups/${groupId()}/compulsory/year3`}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="text-lg font-medium">3학년 필수 이수 과목</div>
          <div className="m-1 mt-3">
            <div className="m-1">3학년 1학기</div>
            <div className="grid grid-cols-2 gap-2">
              {year31 ? (
                year31.map((data, key) => (
                  <div key={key} className="bg-slate-100 p-2 text-center rounded-md">
                    {data.title}
                  </div>
                ))
              ) : (
                <div className="bg-slate-100 p-2 text-center rounded-md col-span-2">미정</div>
              )}
            </div>
            <div className="m-1">3학년 2학기</div>
            <div className="grid grid-cols-2 gap-2">
              {year32 ? (
                year32.map((data, key) => (
                  <div key={key} className="bg-slate-100 p-2 text-center rounded-md">
                    {data.title}
                  </div>
                ))
              ) : (
                <div className="bg-slate-100 p-2 text-center rounded-md col-span-2">미정</div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </ProtectedPage>
  )
}
