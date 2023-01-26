import Link from "next/link"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/AccessDenied"
import useSchool from "../../lib/client/useSchool"

export default function AdminHome() {
  const { data: session } = useSession()
  const { school } = useSchool()
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <div className={"flex h-screen w-full flex-col bg-green-50"}>
          <div className={" m-auto flex flex-col"}>
            <div className={"text-center text-4xl font-bold"}>
              Timble
              <br /> 관리자 페이지
            </div>
            <div className={"mx-auto my-2 mt-6 rounded-xl bg-green-500 p-2 px-4 text-white"}>
              <Link href={`/${school ? `admin/${school.code}` : "admin/signin"}`}>
                <p className={"text-center text-xl"}>시작하기</p>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return <AccessDenied />
    }
  } else {
    return <AccessDenied />
  }
}
