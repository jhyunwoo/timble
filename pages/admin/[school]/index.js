import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import useUser from "../../../lib/client/useUser"
import AccessDenied from "../../../components/AccessDenied"
import ProtectedPage from "../../../components/ProtectedPage"
import Loading from "../../../components/Loading"

export default function SchoolAdminPage() {
  const { status } = useSession()
  const router = useRouter()
  const { user } = useUser()

  if (user) {
    if (status === "authenticated" && user.role === "ADMIN") {
      if (user.admin === router.asPath.replace("/admin/", "")) {
        return (
          <ProtectedPage>
            <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
              <div>학교 관리자 페이지</div>
            </div>
          </ProtectedPage>
        )
      } else {
        return <AccessDenied />
      }
    } else {
      return <AccessDenied />
    }
  } else {
    return <Loading />
  }
}
