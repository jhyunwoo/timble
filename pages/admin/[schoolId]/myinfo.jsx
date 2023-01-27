import MoveBack from "../../../components/MoveBack"
import ProtectedPage from "../../../components/ProtectedPage"
import UserInfoDetail from "../../../components/UserInfoDetail"
import useSchool from "../../../lib/client/useSchool"
import useUser from "../../../lib/client/useUser"

export default function MyInfo() {
  const { school } = useSchool()
  const { user } = useUser()
  return (
    <ProtectedPage>
      <MoveBack title={"홈"} link={`/admin/${school ? school.code : null}`} />
      <div className="px-4">
        <div className="text-2xl font-semibold">내 정보</div>
        {user ? (
          <div className="bg-white shadow-sm rounded-lg p-4 mt-4">
            <UserInfoDetail title={"이름"} content={`${user.name} (${school ? school.name : null} 관리자)`} />
            <UserInfoDetail title={"학교"} content={school ? school.name : null} />
            <UserInfoDetail title={"이메일"} content={user.email} />
          </div>
        ) : (
          ""
        )}
      </div>
    </ProtectedPage>
  )
}
