import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

import Loading from "./Loading"
import Footer from "./Footer"
import AdminHeadBar from "./AdminHeadBar"
import { dataUpdateState } from "./recoil/states"
import AccessDenied from "./AccessDenied"

import useUser from "../lib/client/useUser"
import useAreas from "../lib/client/useAreas"
import useDifficulties from "../lib/client/useDifficulties"
import useDiplomas from "../lib/client/useDiplomas"
import useGroup from "../lib/client/useGroup"
import useGroups from "../lib/client/useGroups"
import useSchool from "../lib/client/useSchool"
import useSchools from "../lib/client/useSchools"
import useStudents from "../lib/client/useStudents"
import useSubject from "../lib/client/useSubject"
import useSubjects from "../lib/client/useSubjects"
import useTypes from "../lib/client/useTypes"

export default function ProtectedPage(props) {
  const router = useRouter()
  const { user } = useUser()
  console.log(user)
  // 사용자 로그인 정보 가져오기
  const { status, data: session } = useSession()
  const { isLoadingAreas } = useAreas()
  const { isLoadingDifficulties } = useDifficulties()
  const { isLoadingDiplomas } = useDiplomas()
  const { isLoadingGroup } = useGroup()
  const { isLoadingGroups } = useGroups()
  const { isLoadingSchool, school } = useSchool()
  const { isLoadingSchools } = useSchools()
  const { isLoadingStudents } = useStudents()
  const { isLoadingSubject } = useSubject()
  const { isLoadingSubjects } = useSubjects()
  const { isLoadingTypes } = useTypes()
  const { isLoadingUser } = useUser()
  const isDataUpdate = useRecoilValue(dataUpdateState)

  if (status === "unauthenticated") {
    router.push("/admin/signin")
    return <Loading />
  } else if (status === "authenticated") {
    if (
      status === "loading" ||
      isLoadingAreas ||
      isLoadingDifficulties ||
      isLoadingDiplomas ||
      isLoadingGroup ||
      isLoadingGroups ||
      isLoadingSchool ||
      isLoadingSchools ||
      isLoadingStudents ||
      isLoadingSubject ||
      isLoadingSubjects ||
      isLoadingTypes ||
      isLoadingUser ||
      isDataUpdate
    ) {
      return <Loading />
    } else if (session.user.role !== "ADMIN" || !router.asPath.includes(user.admin)) {
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
