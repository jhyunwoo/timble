import { useSession } from "next-auth/react"

import HeadBar from "../../components/HeadBar"
import Footer from "../../components/Footer"
import LobbyCard from "../../components/LobbyCard"
import Loading from "../../components/Loading"
import { useRouter } from "next/router"

export default function Timetable() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <Loading />
  }
  if (status === "unauthenticated") {
    router.push("/signin")
  }
  if (status === "authenticated") {
    return (
      <div className={"pt-20"}>
        <div className="min-h-screen">
          <HeadBar page={"timetable"} />
          <div
            className={
              "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }
          >
            <LobbyCard subtitle={"시간표"} title={"시간표 보기"} />
            <LobbyCard subtitle={"시간표"} title={"시간표 짜기"} />

            <LobbyCard
              subtitle={"시간표"}
              title={"친구랑 시간표 맞추기"}
              color={"bg-indigo-500 text-white"}
            />
            <LobbyCard subtitle={"시간표"} title={"디플로마 시간표 추천"} />
            <LobbyCard subtitle={"시간표"} title={"과목 상세 정보"} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
