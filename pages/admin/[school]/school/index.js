import ProtectedPage from "../../../../components/ProtectedPage"

export default function AdminTimetable() {
  return (
    <ProtectedPage>
      <div className="flex h-screen w-full items-center justify-center">
        <div>관리자 학교 페이지</div>
      </div>
    </ProtectedPage>
  )
}
