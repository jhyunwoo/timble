import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { signOut } from "next-auth/react"
import useUser from "../lib/client/useUser"
import { useRouter } from "next/router"

export default function AdminHeadBar(props) {
  // 메뉴바 선택 관리 변수
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const admin = user.admin

  return (
    <div className={"fixed top-0 w-full bg-white/50 py-2 backdrop-blur-3xl"}>
      <div className={"flex items-center justify-between px-2"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"h-8 w-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={`/admin/${admin}`}>
            <button
              className={` rounded-full p-1 px-3 text-base ${
                router.asPath === `/admin/${admin}`
                  ? "bg-slate-900 font-semibold text-white"
                  : ""
              }`}
            >
              홈
            </button>
          </Link>
          <Link href={`/admin/${admin}/school`}>
            <button
              className={` rounded-full p-1 px-3 text-base ${
                router.asPath.replace(`/admin/${admin}/`, "").includes("school")
                  ? "bg-slate-900 font-semibold text-white"
                  : ""
              }`}
            >
              학교
            </button>
          </Link>
          <Link href={`/admin/${admin}/students`}>
            <button
              className={` rounded-full p-1 px-3 text-base ${
                router.asPath
                  .replace(`/admin/${admin}/`, "")
                  .includes("students")
                  ? "bg-slate-900 font-semibold text-white"
                  : ""
              }`}
            >
              학생
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`absolute top-0 z-40 flex min-h-screen w-screen -translate-x-full flex-col bg-slate-50 transition ${
          menu ? "translate-x-0" : ""
        }`}
      >
        <div className={" flex items-center justify-between p-2"}>
          <button onClick={() => setMenu(false)}>
            <XMarkIcon className={"h-8 w-8"} />
          </button>
        </div>
        <div className=" m-4 flex flex-col rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center">
            <div className="text-xl font-semibold">{user.name}님</div>
            {admin && user.role === "ADMIN" ? (
              <div className="mx-2 rounded-full bg-green-500 p-1 px-2 text-sm text-white">
                <Link href={`/admin/${admin}`}>관리자 페이지</Link>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2 flex">
            <Link href="/user/myinfo">내 정보 관리</Link>
            <div className="mx-2">|</div>
            <button onClick={() => signOut()}>로그아웃</button>
          </div>
        </div>
        <div className="p-4"></div>
      </div>
    </div>
  )
}
