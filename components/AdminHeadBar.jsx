import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function AdminHeadBar(props) {
  // 메뉴바 선택 관리 변수
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className={"fixed top-0 w-full bg-white/50 py-2 backdrop-blur-3xl"}>
      <div className={"flex items-center justify-between px-2"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"h-8 w-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={`/admin/${session.user.admin}`}>
            <button
              className={`rounded-full mx-1 p-1 px-3 text-base ${
                router.asPath === `/admin/${session.user.admin}` ? "bg-slate-900 font-semibold text-white" : ""
              }`}
            >
              홈
            </button>
          </Link>
          <Link href={`/admin/${session.user.admin}/school`}>
            <button
              className={`rounded-full mx-1 p-1 px-3 text-base ${
                router.asPath.replace(`/admin/${session.user.admin}/`, "").includes("school")
                  ? "bg-slate-900 font-semibold text-white"
                  : ""
              }`}
            >
              학교
            </button>
          </Link>
          <Link href={`/admin/${session.user.admin}/students`}>
            <button
              className={`rounded-full mx-1 p-1 px-3 text-base ${
                router.asPath.replace(`/admin/${session.user.admin}/`, "").includes("students")
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
            <div className="text-xl font-semibold">{session.user.name}님</div>
            {session.user.admin && session.user.role === "ADMIN" ? (
              <div className="mx-2 rounded-full bg-green-500 p-1 px-2 text-sm text-white">
                <Link href={`/admin/${session.user.admin}`}>관리자 페이지</Link>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-2 flex">
            <Link href={`/admin/${session.user.admin}/myinfo`}>내 정보 관리</Link>
            <div className="mx-2">|</div>
            <button onClick={() => signOut()}>로그아웃</button>
          </div>
        </div>
        <div className="p-4">
          <div className="my-2 border-b-2 border-slate-300 text-sm font-medium text-slate-400">학생</div>
          <div className=" grid grid-cols-1 gap-1">
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/students`}>
              학생 정보
            </Link>
          </div>
          <div className="my-2 border-b-2 border-slate-300 text-sm font-medium text-slate-400">학교</div>
          <div className=" grid grid-cols-1 gap-1">
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/student-group`}>
              학생 그룹 설정
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/groups`}>
              학생 그룹
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/diploma`}>
              디플로마
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/subjects`}>
              교과목
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/types`}>
              교과 종류
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/areas`}>
              교과 영역
            </Link>
            <Link className="text-lg font-semibold" href={`/admin/${session.user.admin}/school/difficulties`}>
              교과 난이도
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
