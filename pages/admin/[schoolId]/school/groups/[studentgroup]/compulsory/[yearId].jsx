import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ProtectedPage from "../../../../../../../components/ProtectedPage"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"
import MoveBack from "../../../../../../../components/MoveBack"

export default function ConfigCoupulsory() {
  const router = useRouter()
  const [filteredSubject, setFilteredSubject] = useState()
  const [filteredSubject1, setFilteredSubject1] = useState()
  const [filteredSubject2, setFilteredSubject2] = useState()

  const { groupSubjects } = useGroupSubjects(groupId())
  function yearId() {
    return router.query.yearId
  }
  function groupId() {
    return router.query.studentgroup
  }
  function schoolId() {
    return router.query.schoolId
  }

  function filter() {
    let subjects = []
    if (groupSubjects) {
      groupSubjects.map((data) => {
        if (yearId() === "1") {
          if (data.open.includes("1-1") || data.open.includes("1-2")) {
            subjects.push(data)
          }
        } else if (yearId() === "2") {
          if (data.open.includes("2-1") || data.open.includes("2-2")) {
            subjects.push(data)
          }
        } else if (yearId() === "3") {
          if (data.open.includes("3-1") || data.open.includes("3-2")) {
            subjects.push(data)
          }
        }
      })
    }
    setFilteredSubject(subjects)
  }
  useEffect(() => {
    filter()
  }, [groupSubjects])

  if(yearId()==="1"){
    return (
      <ProtectedPage>
        <MoveBack title="필수 이수 과목 설정" link={`/admin/${schoolId()}/school/groups/${groupId()}/compulsory`} />
        <div className="p-4">
          <div className="text-2xl font-bold">{yearId()}학년 필수 이수 과목 설정</div>
          <div className="grid grid-cols-2 gap-2 my-4">
            {filteredSubject
              ? filteredSubject.map((data, key) => (
                  <button key={key} className="bg-slate-100 p-2 px-4 rounded-md">
                    <div>{data.title}</div>
                  </button>
                ))
              : null}
          </div>
        </div>
      </ProtectedPage>
    )
  } else {
    return (
      <ProtectedPage>
        <MoveBack title="필수 이수 과목 설정" link={`/admin/${schoolId()}/school/groups/${groupId()}/compulsory`} />
        <div className="p-4">
          <div className="text-2xl font-bold">{yearId()}학년 필수 이수 과목 설정</div>
          <div className="text-lg font-semibold mt-2">1학기</div>
          <div className="grid grid-cols-2 gap-2 my-4">
            {filteredSubject
              ? filteredSubject.map((data, key) => (
                  <button key={key} className="bg-slate-100 p-2 px-4 rounded-md">
                    <div>{data.title}</div>
                  </button>
                ))
              : null}
          </div>
          <div className="text-lg font-semibold mt-2">2학기</div>
          <div className="grid grid-cols-2 gap-2 my-4">
            {filteredSubject
              ? filteredSubject.map((data, key) => (
                  <button key={key} className="bg-slate-100 p-2 px-4 rounded-md">
                    <div>{data.title}</div>
                  </button>
                ))
              : null}
          </div>
        </div>
      </ProtectedPage>
    )
  }
}
