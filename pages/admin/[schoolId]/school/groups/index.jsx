import ProtectedPage from "../../../../../components/ProtectedPage"
import useSchool from "../../../../../lib/client/useSchool"
import Link from "next/link"
import MoveBack from "../../../../../components/moveBack"

export default function StudentGroup() {
  const { groups, code } = useSchool()
  return (
    <ProtectedPage>
      <MoveBack title={"학교"} link={`/admin/${code}/school`} />
      <div className="p-4">
        <div className="text-2xl font-bold mb-4">학생 그룹</div>
        <div className="grid grid-cols-1 gap-4">
          {groups
            ? groups.map((data, key) => (
                <Link
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200"
                  key={key}
                  href={`/admin/${code}/school/groups/${data.id}`}
                >
                  <div className="text-xl font-semibold my-1">{data.name}</div>
                  <div className="text-base font-medium">{data.entrance}년 입학</div>
                </Link>
              ))
            : ""}
        </div>
      </div>
    </ProtectedPage>
  )
}
