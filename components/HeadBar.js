import Link from "next/link"
import { useState } from "react"

export default function HeadBar(props) {
  const [menu, setMenu] = useState(false)
  return (
    <div className={"bg-green-100 py-4"}>
      <div className={"flex justify-between px-4 items-center"}>
        <button onClick={() => setMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 scale-105"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={"flex"}>
          <Link href={"/lobby"}>
            <button
              className={`mx-2 text-lg ${
                props.page === "lobby" ? "font-semibold" : ""
              }`}
            >
              홈
            </button>
          </Link>
          <Link href={"timetable"}>
            <button
              className={`mx-2 text-lg ${
                props.page === "timetable" ? "font-semibold" : ""
              }`}
            >
              시간표
            </button>
          </Link>
          <Link href={"friends"}>
            <button
              className={`mx-2 text-lg ${
                props.page === "friends" ? "font-semibold" : ""
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 scale-105"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
