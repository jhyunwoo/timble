import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { adminState } from "../../../components/states"
import { selectorFamily, userInfo } from "../../../components/states"

import Loading from "../../../components/Loading"
import getUserInfo from "../../api/getUserInfo"

export default function SchoolAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // const [admin, setAdmin] = useRecoilState(adminState)

  // function isAdmin() {
  //   if (admin === "") {
  //     axios
  //       .post("/api/verifyAdminUser", {
  //         userEmail: "jhyunwoo0228@gmail.com",
  //       })
  //       .then((r) => setAdmin(r.data))
  //   }
  // }
  // useEffect(() => {
  //   isAdmin()
  // })
  const userEmail = "jhyunwoo0228@gamil.com"
  const userInfomation = useRecoilValue(userInfo(userEmail))

  if (status == "loading") {
    return <Loading />
  } else if (status === "unauthenticated") {
    router.push("/signin")
  } else if (status === "authenticated") {
    if (admin) {
      return (
        <div>
          <div>학교 관리자 페이지</div>
          <button onClick={() => console.log(userInfomation)}>
            console.log
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <div>관리자 권한이 필요합니다.</div>
        </div>
      )
    }
  }
}
