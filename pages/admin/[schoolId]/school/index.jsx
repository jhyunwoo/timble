import ProtectedPage from "../../../../components/ProtectedPage"
import useUser from "../../../../lib/client/useUser"
import Link from "next/link"
import SchoolName from "../../../../components/SchoolName"

export default function AdminTimetable() {
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div className="p-4 grid grid-cols-2 gap-4">
        <SchoolName />
        <ConfigList title={"학생 그룹 설정"} link={`/admin/${user ? user.admin : null}/school/student-group`} />
        <ConfigList title={"학생 그룹"} link={`/admin/${user ? user.admin : null}/school/groups`} />
        <ConfigList title={"디플로마"} link={`/admin/${user ? user.admin : null}/school/diploma`} />
        <ConfigList title={"교과목"} link={`/admin/${user ? user.admin : null}/school/subjects`} />
        <ConfigList title={"교과 종류"} link={`/admin/${user ? user.admin : null}/school/types`} />
        <ConfigList title={"교과 영역"} link={`/admin/${user ? user.admin : null}/school/areas`} />
        <ConfigList title={"교과 난이도"} link={`/admin/${user ? user.admin : null}/school/difficulties`} />
      </div>
    </ProtectedPage>
  )
  function ConfigList(props) {
    return (
      <Link href={props.link} className="col-span-2">
        <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
          <div className="text-xl font-semibold">{props.title}</div>
        </div>
      </Link>
    )
  }
}
