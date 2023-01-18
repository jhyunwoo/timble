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
    <div className={"py-2 fixed top-0 w-full bg-white/50 backdrop-blur-3xl"}>
      <div className={"flex justify-between px-2 items-center"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"w-8 h-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={`/admin/${admin}/classes`}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                router.asPath
                  .replace(`/admin/${admin}/`, "")
                  .includes("classes")
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              수업 정보
            </button>
          </Link>
          <Link href={`/admin/${admin}/students`}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                router.asPath
                  .replace(`/admin/${admin}/`, "")
                  .includes("students")
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              학생 관리
            </button>
          </Link>
          <Link href={`/admin/${admin}/timetable`}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                router.asPath
                  .replace(`/admin/${admin}/`, "")
                  .includes("timetable")
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              시간표 추천
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`bg-slate-50 w-screen min-h-screen z-40 absolute top-0 -translate-x-full transition flex flex-col ${
          menu ? "translate-x-0" : ""
        }`}
      >
        <div className={" flex justify-between items-center p-2"}>
          <button onClick={() => setMenu(false)}>
            <XMarkIcon className={"w-8 h-8"} />
          </button>
        </div>
        <div className=" bg-white flex flex-col p-6 m-4 shadow-xl rounded-md">
          <div className="flex items-center">
            <div className="text-xl font-semibold">{user.name}님</div>
            {admin && user.role === "ADMIN" ? (
              <div className="mx-2 text-sm rounded-full bg-green-500 p-1 px-2 text-white">
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
