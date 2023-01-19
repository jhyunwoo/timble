import ProtectedPage from "../../../../../components/ProtectedPage"

export default function AdminSubjects() {
  return (
    <ProtectedPage>
      <div className="flex h-screen w-full items-center justify-center">
        <div>관리자 교과목 페이지</div>
      </div>
    </ProtectedPage>
  )
}
