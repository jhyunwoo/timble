import ProtectedPage from "../../../../../../../components/ProtectedPage";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"
import MoveBack from "../../../../../../../components/MoveBack"

export default function Year1(){
    const router = useRouter()
  const [filteredSubject, setFilteredSubject] = useState()

  const { groupSubjects } = useGroupSubjects(groupId())

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
        
         
          if (data.open.includes("3-1") || data.open.includes("3-2")) {
            subjects.push(data)
          }
        
      })
    }
    setFilteredSubject(subjects)
  }
  useEffect(() => {
    filter()
  }, [groupSubjects])
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
}