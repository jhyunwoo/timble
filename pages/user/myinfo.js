import MoveBack from "../../components/moveBack"
import LayOut from "../../components/LayOut"
import useUser from "../../lib/client/useUser"
import axios from "axios"
import { useRouter } from "next/router"
import UserInfoDetail from "../../components/UserInfoDetail"

export default function MyInfo() {
  const { user } = useUser()
  const router = useRouter()
  async function updateUserInfo() {
    await axios.post("/api/updateUserInfo", {
      userEmail: user.email,
    })
    router.push("/lobby")
  }
  return (
    <LayOut>
      <MoveBack title={"홈"} link={`/lobby`} />
      <div className="px-4">
        <div className="text-2xl font-semibold">내 정보</div>
        {user ? (
          <div className="bg-white shadow-sm rounded-lg p-4 mt-4">
            <UserInfoDetail title={"이름"} content={user.name} />
            <UserInfoDetail title={"이메일"} content={user.email} />
            <UserInfoDetail title={"학교"} content={user.School.name} />
            <UserInfoDetail title={"학년"} content={`${user.year}학년`} />
            <UserInfoDetail title={"디플로마"} content={user.diploma.name} />

            <button
              onClick={() => updateUserInfo()}
              className="w-full bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200"
            >
              재설정
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </LayOut>
  )
}
