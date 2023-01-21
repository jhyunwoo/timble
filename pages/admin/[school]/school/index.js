import ProtectedPage from "../../../../components/ProtectedPage"
import useUser from "../../../../lib/client/useUser"
import Link from "next/link"

export default function AdminTimetable() {
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div className="p-4 flex flex-col">
        <Link href={`/admin/${user ? user.admin : null}/school/diploma`}>
          <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition duration-200 my-2">
            <div className="text-2xl font-bold">디플로마</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/subjects`}>
          <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition duration-200 my-2">
            <div className="text-2xl font-bold">교과목</div>
          </div>
        </Link>
      </div>
    </ProtectedPage>
  )
}
