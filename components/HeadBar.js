import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { signOut } from "next-auth/react"
import useUser from "../lib/client/useUser"

export default function HeadBar(props) {
  // 메뉴바 선택 관리 변수
  const [menu, setMenu] = useState(false)
  const { user } = useUser()
  const admin = user.admin

  return (
    <div className={"fixed top-0 w-full bg-white/50 py-4 backdrop-blur-3xl"}>
      <div className={"flex items-center justify-between px-4"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"h-8 w-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={"/lobby"}>
            <button
              className={`mx-1 rounded-full p-1 px-3 text-base ${
                props.page === "lobby" ? "bg-slate-900 font-semibold text-white" : ""
              }`}
            >
              홈
            </button>
          </Link>
          <Link href={"/timetable"}>
            <button
              className={`mx-1 rounded-full p-1 px-3 text-base ${
                props.page === "timetable" ? "bg-slate-900 font-semibold text-white" : ""
              }`}
            >
              시간표
            </button>
          </Link>
          <Link href={"/friends"}>
            <button
              className={`mx-1 rounded-full p-1 px-3 text-base ${
                props.page === "friends" ? "bg-slate-900 font-semibold text-white" : ""
              }`}
            >
              친구
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`absolute top-0 z-40 flex min-h-screen w-screen -translate-x-full flex-col bg-slate-50 transition ${
          menu ? "translate-x-0" : ""
        }`}
      >
        <div className={" flex items-center justify-between p-4"}>
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
        <div className="p-4">
          <div className="my-2 border-b-2 border-slate-300 text-sm font-medium text-slate-400">시간표</div>
          <div className=" grid grid-cols-1 gap-1">
            <Link className="text-lg font-semibold" href="/timetable/mytimetable">
              내 시간표
            </Link>
            <Link className="text-lg font-semibold" href="/timetable/generate">
              시간표 구성하기
            </Link>
            <Link className="text-lg font-semibold" href="/timetable/matchwithfriend">
              친구랑 시간표 맞추기
            </Link>
            <Link className="text-lg font-semibold" href="/timetable/class">
              과목 정보
            </Link>
            <Link className="text-lg font-semibold" href="/timetable/advise">
              디플로마 시간표 추천
            </Link>
          </div>
          <div className="my-2 border-b-2 border-slate-300 text-sm font-medium text-slate-400">친구</div>
          <div className=" grid grid-cols-1 gap-1">
            <Link className="text-lg font-semibold" href="/friends/add">
              친구 추가
            </Link>
            <Link className="text-lg font-semibold" href="/friends/list">
              친구 목록
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
