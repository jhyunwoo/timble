import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Lobby() {
  // router 설정
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  // NullData 저장
  const [nullData, setNullData] = useState()

  // 로그인 되지 않은 사용자 메인 페이지로 이동
  function checkUserAuth() {
    if (!session) {
      router.push("/").then((r) => console.log("Redirect to Main Page"))
    }
  }

  // 사용자 Null 데이터 받아오기
  function getUserNull() {
    if (session) {
      let userData = fetch("/api/getUserNullData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session.user.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => setNullData(data))
    }
  }

  useEffect(() => {
    checkUserAuth()
    getUserNull()
  }, [])

  if (session) {
    return (
      <div>
        <div>Lobby</div>
        <button onClick={() => signOut()}>Sign Out</button>
        <br />
        <button onClick={() => console.log(nullData)}>print null</button>
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
