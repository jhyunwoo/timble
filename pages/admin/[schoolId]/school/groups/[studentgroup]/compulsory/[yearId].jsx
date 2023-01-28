import { useRouter } from "next/router"
import ProtectedPage from "../../../../../../../components/ProtectedPage"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"

export default function ConfigCoupulsory() {
  const router = useRouter()
  const { groupSubjects } = useGroupSubjects(groupId())
  function yearId() {
    return router.query.yearId
  }
  function groupId() {
    return router.query.studentgroup
  }
  console.log(groupSubjects)
  return (
    <ProtectedPage>
      <div className="p-4">
        <div className="text-2xl font-bold">{yearId()}학년 필수 이수 과목 설정</div>
        <div className="grid grid-cols-3 gap-4 my-4">
          {groupSubjects
            ? groupSubjects.map((data, key) => (
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
