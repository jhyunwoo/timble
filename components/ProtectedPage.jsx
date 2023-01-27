import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Loading from "./Loading"
import Footer from "./Footer"
import AdminHeadBar from "./AdminHeadBar"
import AccessDenied from "./AccessDenied"

export default function ProtectedPage(props) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    router.push("/admin/signin")
    return <Loading />
  } else if (status === "authenticated") {
    if (session.user.role !== "ADMIN" || !router.asPath.includes(session.user.admin)) {
      return <AccessDenied />
    } else {
      return (
        <div className="bg-slate-50 pt-14">
          <AdminHeadBar />
          <div className="min-h-screen w-full">{props.children}</div>
          <Footer />
        </div>
      )
    }
  }
}
