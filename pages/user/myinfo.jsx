import MoveBack from "../../components/moveBack"
import LayOut from "../../components/LayOut"
import useUser from "../../lib/client/useUser"
import axios from "axios"
import { useRouter } from "next/router"
import UserInfoDetail from "../../components/UserInfoDetail"
import useSchool from "../../lib/client/useSchool"

export default function MyInfo() {
  const { user } = useUser()
  const { school } = useSchool()
  const router = useRouter()
  async function updateUserInfo() {
    await axios.put("/api/users/reset")
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
            <UserInfoDetail title={"학교"} content={school ? school.name : null} />
            <UserInfoDetail title={"학생 그룹"} content={`${user.studentgroup.name}`} />
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
