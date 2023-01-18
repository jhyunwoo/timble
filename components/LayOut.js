import { useSession } from "next-auth/react"
import { useEffect } from "react"
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
  const { isLoading, isError, nullData } = useUser()

  function checkUserNull() {
    if (nullData) {
      if (nullData.length >= 1) {
        router.push("/user/addinfo").then()
      }
    }
  }

  useEffect(() => {
    checkUserNull()
  }, [nullData])

  if (status === "loading" || isLoading) {
    return <Loading />
  } else if (isError) {
    return <Error />
  } else if (status === "unauthenticated") {
    router.push("/signin")
  } else if (status === "authenticated") {
    return (
      <div className="pt-20 bg-slate-50">
        <div className="min-h-screen">
          <HeadBar page={props.pageLocation} />
          {props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
