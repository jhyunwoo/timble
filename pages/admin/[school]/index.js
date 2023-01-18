import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Loading from "../../../components/Loading"
import useUser from "../../../lib/client/useUser"
import AccessDenied from "../../../components/AccessDenied"

export default function SchoolAdminPage() {
  const { status } = useSession()
  const router = useRouter()

  const { user } = useUser()

  if (status == "loading") {
    return <Loading />
  } else if (status === "unauthenticated") {
    router.push("/signin")
  } else if (status === "authenticated" && user.role === "ADMIN") {
    if (user.admin === router.asPath.replace("/admin/", "")) {
      return (
        <div className="bg-slate-50 w-full min-h-screen flex justify-center items-center">
          <div>학교 관리자 페이지</div>
        </div>
      )
    } else {
      return <AccessDenied />
    }
  } else {
    return <AccessDenied />
  }
}
