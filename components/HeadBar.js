import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"

export default function HeadBar(props) {
  const [menu, setMenu] = useState(false)
  return (
    <div className={" py-4 fixed top-0 w-full backdrop-blur-3xl"}>
      <div className={"flex justify-between px-4 items-center"}>
        <button onClick={() => setMenu(true)}>
          <Bars3Icon className={"w-8 h-8"} />
        </button>
        <div className={"flex items-center"}>
          <Link href={"/lobby"}>
            <button
              className={` text-lg p-1 px-3 rounded-full ${
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
              className={` text-lg p-1 px-3 rounded-full ${
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
              className={` text-lg p-1 px-3 rounded-full ${
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
        className={`bg-red-200 w-screen h-screen z-40 absolute top-0 -translate-x-full transition flex flex-col ${
          menu ? "translate-x-0" : ""
        }`}
      >
        <div className={"bg-red-100 flex justify-between items-center p-4"}>
          <button onClick={() => setMenu(false)}>
            <XMarkIcon className={"w-8 h-8"} />
          </button>
        </div>
      </div>
    </div>
  )
}
