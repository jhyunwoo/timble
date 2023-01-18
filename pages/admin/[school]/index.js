import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loading from "../../../components/Loading"

export default function SchoolAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [admin, setAdmin] = useState("")

  function isAdmin() {
    if (admin === "" && session) {
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
    if (admin) {
      return (
        <div>
          <div>학교 관리자 페이지</div>
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
