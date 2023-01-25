import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import Loading from "./Loading"
import Footer from "./Footer"

import useUser from "../lib/client/useUser"
import AdminHeadBar from "./AdminHeadBar"
import useSchool from "../lib/client/useSchool"
import useCheckUserNull from "../lib/client/useCheckUserNull"
import { dataUpdateState } from "./recoil/states"
import AccessDenied from "./AccessDenied"
import useSubjects from "../lib/client/useSubjects"

export default function ProtectedPage(props) {
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { status } = useSession()
  const { user, isLoadingUser, nullData } = useUser()
  const { isLoadingSchool } = useSchool()
  const { isLoadingSubjects } = useSubjects()
  const { isLoadingSubject } = useSchool()
  const isDataUpdate = useRecoilValue(dataUpdateState)
  useCheckUserNull(nullData)

  if (status === "unauthenticated") {
    router.push("/signin")
    return <Loading />
  } else if (status === "authenticated") {
    if (
      status === "loading" ||
      isLoadingUser ||
      isLoadingSchool ||
      isDataUpdate ||
      isLoadingSubjects ||
      isLoadingSubject
    ) {
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
    return <Loading />
  }
}
