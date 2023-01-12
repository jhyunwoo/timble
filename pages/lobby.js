import LobbyCard from "../components/LobbyCard"
import LayOut from "../components/LayOut"

export default function Lobby() {
  return (
    <LayOut pageLocation="lobby">
      <div
        className={
          "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        <LobbyCard
          title={"시간표 구성하기"}
          subtitle={"시간표"}
          link={"/lobby"}
        />
        <LobbyCard
          title={"친구랑 시간표 맞추기"}
          subtitle={"친구"}
          color={"bg-emerald-500 text-white"}
          link={"/lobby"}
        />
        <LobbyCard
          title={"디플로마 시간표 추천"}
          subtitle={"시간표"}
          link={"/lobby"}
        />
        <LobbyCard title={"과목 정보"} subtitle={"시간표"} link={"/lobby"} />
        <LobbyCard title={"친구 추가"} subtitle={"친구"} link={"/lobby"} />
      </div>
    </LayOut>
  )
}
