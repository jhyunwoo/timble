import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import HeadBar from "./HeadBar"
import Footer from "./Footer"
import Loading from "./Loading"
import Error from "./Error"
import useUser from "../lib/client/useUser"

export default function LayOut(props) {
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { status } = useSession()
  const { nullData, user } = useUser()
  if (nullData.length > 0) {
    router.push("/user/addinfo")
  } else if (user) {
    if (user.role === "ADMIN") {
      router.push("/admin")
    } else if (status === "unauthenticated") {
      router.push("/signin")
      return <Loading />
    } else if (status === "authenticated") {
      return (
        <div className="bg-slate-50 pt-20">
          <div className="min-h-screen">
            <HeadBar page={props.pageLocation} />
            {props.children}
          </div>
          <Footer />
        </div>
      )
    } else {
      return <Error />
    }
  }
}
