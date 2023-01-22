import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Loading from "./Loading"
import Error from "./Error"
import Footer from "./Footer"

import useUser from "../lib/client/useUser"
import AdminHeadBar from "./AdminHeadBar"
import useSchool from "../lib/client/useSchool"
import useCheckUserNull from "../lib/client/useCheckUserNull"
import AccessDenied from "./AccessDenied"

export default function ProtectedPage(props) {
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { status } = useSession()
  const { user, isLoadingUser, isErrorUser, nullData } = useUser()
  const { isLoadingSchool, isErrorSchool } = useSchool()

  useCheckUserNull(nullData)

  if (status === "unauthenticated") {
    router.push("/signin")
    return <Loading />
  } else if (status === "authenticated") {
    if (status === "loading" || isLoadingUser || isLoadingSchool) {
      return <Loading />
    } else if (user.role !== "ADMIN" || !router.asPath.includes(user.admin)) {
      return <AccessDenied />
    } else {
      return (
        <div className="bg-slate-50 pt-14">
          <AdminHeadBar />
          <div className="min-h-screen w-full">{props.children}</div>
          <Footer />
        </div>
      )
    }
  } else {
    return <AccessDenied />
  }
}
