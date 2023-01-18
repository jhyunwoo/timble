import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-semibold">🚧 접근 거부 🚧</div>
        <Link href={"/lobby"}>
          <div className="m-4 p-2 px-8 bg-green-500 rounded-xl text-white text-lg transition duration-200 hover:bg-green-400">
            홈 페이지
          </div>
        </Link>
      </div>
    </div>
  )
}
