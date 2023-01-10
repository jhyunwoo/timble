import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"

import HeadBar from "../components/HeadBar"
import LobbyCard from "../components/LobbyCard"

export default function Lobby() {
  // router 설정
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  // NullData 저장
  const [nullData, setNullData] = useState([])

  // 로그인 되지 않은 사용자 메인 페이지로 이동
  function checkUserAuth() {
    if (!session) {
      router.push("/").then((r) => console.log("Redirect to Main Page"))
    }
  }

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
    if (nullData.length >= 1) {
      router
        .push("/userinfo")
        .then((r) => console.log("Redirect to UserInfo Page"))
    }
  }

  useEffect(() => {
    checkUserNull()
  }, [nullData])

  useEffect(() => {
    checkUserAuth()
    getUserNull()
  }, [])

  if (session) {
    return (
      <div className={"w-full min-h-screen bg-green-50"}>
        <HeadBar page={"lobby"} />
        <div className={"grid grid-cols-1 gap-4 p-4"}>
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
          <LobbyCard title={"2학년 2학기 시간표"} subtitle={"시간표"} />
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={
          "flex bg-green-50 justify-center items-center w-full h-screen"
        }
      >
        <button
          className={
            "bg-green-600 text-2xl px-6 py-2 rounded-xl text-white font-semibold transition duration-200 hover:bg-green-700 hover:scale-105"
          }
          onClick={() => router.push("/signin")}
        >
          로그인
        </button>
      </div>
    )
  }
}
