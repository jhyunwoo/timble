import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"

import { emailState, userState, userNullState, sessionState } from "./states"
import HeadBar from "../components/HeadBar"
import Footer from "../components/Footer"
import Loading from "../components/Loading"

export default function LayOut(props) {
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { data: session, status } = useSession()
  // NullData 저장
  const [nullData, setNullData] = useState()

  const [email, setEmail] = useRecoilState(emailState)
  const [userSession, setUserSession] = useRecoilState(sessionState)
  const userData = useRecoilValue(userState)
  const userNull = useRecoilValue(userNullState)

  // 사용자 Null 데이터 받아오기
  function getUserNull() {
    if (session) {
      axios
        .post("/api/getUserNullData", {
          userEmail: session.user.email,
        })
        .then((response) => setNullData(response.data))
        .catch((error) => console.log(error))
    }
  }

  function checkUserNull() {
    if (nullData) {
      if (nullData.length >= 1) {
        router
          .push("/user/addinfo")
          .then((r) => console.log("Redirect to addinfo Page"))
      }
    }
  }

  useEffect(() => {
    checkUserNull()
  }, [nullData])

  useEffect(() => {
    getUserNull()
    if (session) {
      setEmail(session.user.email)
      setUserSession(session)
      console.log("in layout")
    }
    // console.log(userData)
    console.log(userNull)
    // console.log(userSession)
  }, [session])

  if (status === "loading") {
    return <Loading />
  }
  if (status === "unauthenticated") {
    router.push("/signin")
  }
  if (status === "authenticated") {
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
