import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold">🚧 접근 거부 🚧</div>
        <Link href={"/lobby"}>
          <div className="m-4 rounded-xl bg-green-500 p-2 px-8 text-lg text-white transition duration-200 hover:bg-green-400">
            홈 페이지
          </div>
        </Link>
      </div>
    </div>
  )
}
