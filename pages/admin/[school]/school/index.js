import ProtectedPage from "../../../../components/ProtectedPage"
import useUser from "../../../../lib/client/useUser"
import Link from "next/link"

export default function AdminTimetable() {
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href={`/admin/${user ? user.admin : null}/school/diploma`}>
          <div className="bg-white shadow-md py-6 p-4 rounded-lg hover:shadow-lg transition duration-200">
            <div className="text-2xl font-bold">디플로마</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/subjects`}>
          <div className="bg-white shadow-md py-6 p-4 rounded-lg hover:shadow-lg transition duration-200">
            <div className="text-2xl font-bold">교과목</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/types`}>
          <div className="bg-white shadow-md py-6 p-4 rounded-lg hover:shadow-lg transition duration-200">
            <div className="text-2xl font-bold">교과 종류</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/areas`}>
          <div className="bg-white shadow-md py-6 p-4 rounded-lg hover:shadow-lg transition duration-200">
            <div className="text-2xl font-bold">교과 영역</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/difficulties`}>
          <div className="bg-white shadow-md py-6 p-4 rounded-lg hover:shadow-lg transition duration-200">
            <div className="text-2xl font-bold">교과 난이도</div>
          </div>
        </Link>
      </div>
    </ProtectedPage>
  )
}
