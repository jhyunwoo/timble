import HeadBar from "../../components/HeadBar"
import Footer from "../../components/Footer"
import LobbyCard from "../../components/LobbyCard"
import ProtectedPage from "../../components/ProtectedPage"
export default function friends() {
  function FriendsPage() {
    return (
      <div className={"pt-20"}>
        <HeadBar page={"friends"} />
        <div
          className={
            "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          <LobbyCard subtitle={"친구"} title={"친구 목록"} />
          <LobbyCard subtitle={"친구"} title={"친구 추가"} />
          <LobbyCard
            subtitle={"시간표"}
            title={"친구랑 시간표 맞추기"}
            color={"bg-amber-400 text-white"}
          />
          <LobbyCard subtitle={"친구"} title={"내 정보"} />
        </div>

        <Footer />
      </div>
    )
  }
  return <ProtectedPage page={FriendsPage()} />
}
