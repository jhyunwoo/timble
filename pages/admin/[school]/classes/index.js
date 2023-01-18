import ProtectedPage from "../../../../components/ProtectedPage"

export default function AdminClasses() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div>admin classes</div>
      </div>
    </ProtectedPage>
  )
}
