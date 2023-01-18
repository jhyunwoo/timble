import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import useUser from "../../../lib/client/useUser"
import useSchool from "../../../lib/client/useSchool"

import ProtectedPage from "../../../components/ProtectedPage"

export default function SchoolAdminPage() {
  const { status } = useSession()
  const router = useRouter()
  const { user } = useUser()
  const { students } = useSchool()
  return (
    <ProtectedPage>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="rounded-xl bg-white p-4 shadow-lg">관리자 페이지</div>
      </div>
    </ProtectedPage>
  )
}
