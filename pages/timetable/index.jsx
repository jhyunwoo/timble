import LobbyCard from "../../components/LobbyCard"
import LayOut from "../../components/LayOut"

export default function Timetable() {
  return (
    <LayOut pageLocation="timetable">
      <div
        className={
          "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        <LobbyCard
          subtitle={"시간표"}
          title={"시간표 보기"}
          link={"/timetable/mytimetable"}
        />
        <LobbyCard
          subtitle={"시간표"}
          title={"시간표 짜기"}
          link={"/timetable/generate"}
        />

        <LobbyCard
          subtitle={"시간표"}
          title={"친구랑 시간표 맞추기"}
          color={"bg-indigo-500 text-white"}
          link={"/timetable/matchwithfriend"}
        />
        <LobbyCard
          subtitle={"시간표"}
          title={"디플로마 시간표 추천"}
          link={"/timetable/advise"}
        />
        <LobbyCard
          subtitle={"시간표"}
          title={"과목 정보"}
          link={"/timetable/class"}
        />
      </div>
    </LayOut>
  )
}
