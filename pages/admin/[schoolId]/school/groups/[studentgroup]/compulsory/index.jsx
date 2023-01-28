import { useRouter } from "next/router"
import MoveBack from "../../../../../../../components/MoveBack"
import ProtectedPage from "../../../../../../../components/ProtectedPage"
import useGroup from "../../../../../../../lib/client/useGroup"
import useSchool from "../../../../../../../lib/client/useSchool"
import Link from "next/dist/client/link"

export default function CompulsorySubjects() {
  const router = useRouter()
  const { school } = useSchool()
  const { group } = useGroup(groupId())
  function groupId() {
    return router.query.studentgroup
  }

  return (
    <ProtectedPage>
      <MoveBack
        title={group ? group.name : null}
        link={`/admin/${school ? school.code : null}/school/groups/${groupId()}`}
      />
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="text-xl font-semibold mx-2">필수 이수 과목 설정</div>
        <AddCompulsory year={1} />
        <AddCompulsory year={2} />
        <AddCompulsory year={3} />
      </div>
    </ProtectedPage>
  )

  function AddCompulsory(props) {
    return (
      <Link
        href={`/admin/${school ? school.code : null}/school/groups/${groupId()}/compulsory/${props.year}`}
        className="bg-white rounded-lg p-4 shadow-sm"
      >
        <div className="text-lg font-medium">{props.year}학년 필수 이수 과목</div>
      </Link>
    )
  }
}
