import { useRouter } from "next/router"
import ProtectedPage from "../../../../../../components/ProtectedPage"
import useSchool from "../../../../../../lib/client/useSchool"
import useGroup from "../../../../../../lib/client/useGroup"
import MoveBack from "../../../../../../components/MoveBack"
import Link from "next/link"

export default function StudentGroupDetail() {
  const router = useRouter()
  const { school } = useSchool()
  const { group } = useGroup(getGroupId())
  function getGroupId() {
    let id = router.asPath.replace(`/admin/${school ? school.code : null}/school/groups/`, "")
    return id
  }
  if (group) {
    return (
      <ProtectedPage>
        <MoveBack title={"학생 그룹"} />
        <div className="p-4 grid grid-cols-1">
          <div className="text-2xl font-bold m-2">학생 그룹 정보</div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xl font-semibold my-1">{group.name}</div>
            <div className="text-lg font-medium">{group.entrance}년 입학</div>
          </div>
          <div className="text-2xl font-bold m-2 mt-4">설정</div>
          <div className="grid grid-cols-1 gap-4">
            <Link
              className="bg-white p-4 rounded-lg shadow-sm text-xl font-medium hover:shadow-lg transition duration-200"
              href={`/admin/${school.code}/school/groups/${getGroupId()}/subjects`}
            >
              교과목 설정
            </Link>
            <Link
              className="bg-white p-4 rounded-lg shadow-sm text-xl font-medium hover:shadow-lg transition duration-200"
              href={`/admin/${school.code}/school/groups/${getGroupId()}/compulsory`}
            >
              필수 이수 과목 설정
            </Link>
          </div>
        </div>
      </ProtectedPage>
    )
  }
}
