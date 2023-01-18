import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "../../../components/Loading"

export default function SchoolAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [admin, setAdmin] = useState()

  function isAdmin() {
    if (session) {
      axios
        .post("/api/verifyAdminUser", {
          userEmail: session.user.email,
        })
        .then((r) => setAdmin(r.data))
    }
  }
  useEffect(() => {
    isAdmin()
  }, [session])

  if (status == "loading") {
    return <Loading />
  } else if (status === "unauthenticated") {
    router.push("/signin")
  } else if (status === "authenticated") {
    if (admin === router.asPath.replace("/admin/", "")) {
      return (
        <div className="bg-slate-50 w-full min-h-screen flex justify-center items-center">
          <div>학교 관리자 페이지</div>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center items-center min-h-screen w-full">
          <div className="flex flex-col justify-center items-center">
            <div
              className="text-2xl font-semibold"
              onClick={() => console.log(admin, adminPage)}
            >
              🚧 접근 거부 🚧
            </div>
            <Link href={"/lobby"}>
              <div className="m-4 p-2 px-8 bg-green-500 rounded-xl text-white text-lg transition duration-200 hover:bg-green-400">
                홈 페이지
              </div>
            </Link>
          </div>
        </div>
      )
    }
  }
}
