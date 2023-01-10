import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className={"flex w-full h-screen bg-green-50 flex-col"}>
      <div className={" m-auto flex flex-col"}>
        <div className={"text-6xl font-bold text-center"}>Timble</div>
        <div className={"text-center text-lg mt-1"}>
          친구랑 시간표 맞추고 싶어?
        </div>
        <div
          className={
            "mt-4 bg-green-500 text-white mx-auto my-2 p-2 px-4 rounded-xl"
          }
        >
          <Link href={`${session ? "lobby" : "signin"}`}>
            <p className={"text-center text-2xl"}>시작하기</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
