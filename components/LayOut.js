import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"

import {
  emailSelector,
  sessionState,
  userInfoSelector,
  userNullSelector,
} from "./states"
import HeadBar from "../components/HeadBar"
import Footer from "../components/Footer"
import Loading from "../components/Loading"

export default function LayOut(props) {
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { data: session, status } = useSession()

  const [userSession, setUserSession] = useRecoilState(sessionState)
  const userNullData = useRecoilValue(userNullSelector)

  function checkUserNull() {
    if (userNullData) {
      if (userNullData.length >= 1) {
        router
          .push("/user/addinfo")
          .then((r) => console.log("Redirect to addinfo Page"))
      }
    }
  }

  useEffect(() => {
    checkUserNull()
  }, [userNullData])

  useEffect(() => {
    if (session) {
      setUserSession(session)
    }
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
