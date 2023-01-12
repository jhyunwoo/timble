import LobbyCard from "../../components/LobbyCard"
import LayOut from "../../components/LayOut"

export default function Friends() {
  return (
    <LayOut pageLocation={"friends"}>
      <div
        className={
          "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        <LobbyCard subtitle={"친구"} title={"친구 목록"} link={"/lobby"} />
        <LobbyCard subtitle={"친구"} title={"친구 추가"} link={"/lobby"} />
        <LobbyCard
          subtitle={"시간표"}
          title={"친구랑 시간표 맞추기"}
          color={"bg-amber-400 text-white"}
          link={"/lobby"}
        />
        <LobbyCard subtitle={"친구"} title={"내 정보"} link={"/lobby"} />
      </div>
    </LayOut>
  )
}
