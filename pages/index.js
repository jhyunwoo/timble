import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className={"flex h-screen w-full flex-col bg-green-50"}>
      <div className={" m-auto flex flex-col"}>
        <div className={"text-center text-6xl font-bold"}>Timble</div>
        <div className={"mt-1 text-center text-lg"}>
          친구랑 시간표 맞추고 싶어?
        </div>
        <div
          className={
            "mx-auto my-2 mt-4 rounded-xl bg-green-500 p-2 px-4 text-white"
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
