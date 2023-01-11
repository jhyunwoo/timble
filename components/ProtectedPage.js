import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
export default function ProtectedPage(props) {
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return props.page
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
