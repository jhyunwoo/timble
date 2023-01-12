import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"

export default function HeadBar(props) {
  const [menu, setMenu] = useState(false)
  const { data: session } = useSession()
  return (
    <div className={"py-4 fixed top-0 w-full backdrop-blur-3xl"}>
      <div className={"flex justify-between px-4 items-center"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"w-8 h-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={"/lobby"}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                props.page === "lobby"
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              홈
            </button>
          </Link>
          <Link href={"timetable"}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                props.page === "timetable"
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              시간표
            </button>
          </Link>
          <Link href={"friends"}>
            <button
              className={` text-base p-1 px-3 rounded-full ${
                props.page === "friends"
                  ? "font-semibold bg-slate-900 text-white"
                  : ""
              }`}
            >
              친구
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`bg-slate-50 w-screen min-h-screen z-40 absolute top-0 -translate-x-full transition flex flex-col ${
          menu ? "translate-x-0" : ""
        }`}
      >
        <div className={" flex justify-between items-center p-4"}>
          <button onClick={() => setMenu(false)}>
            <XMarkIcon className={"w-8 h-8"} />
          </button>
        </div>
        <div className=" bg-white flex flex-col p-6 m-4 shadow-xl ">
          <div className="text-xl font-semibold">{session.user.name}님</div>
          <div className="mt-2 flex">
            <button>내 정보 관리</button>
            <div className="mx-2">|</div>
            <button onClick={() => signOut()}>로그아웃</button>
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm font-medium my-2 border-b-2 border-slate-300 text-slate-400">
            시간표
          </div>
          <div className=" grid grid-cols-1 gap-1">
            <div className="text-lg font-semibold">내 시간표</div>
            <div className="text-lg font-semibold">시간표 구성하기</div>
          </div>
          <div className="text-sm font-medium my-2 border-b-2 border-slate-300 text-slate-400">
            친구
          </div>
          <div className=" grid grid-cols-1 gap-1">
            <div className="text-lg font-semibold">친구 추가</div>
            <div className="text-lg font-semibold">친구 목록</div>
            <div className="text-lg font-semibold">친구랑 시간표 맞추기</div>
          </div>
        </div>
      </div>
    </div>
  )
}
