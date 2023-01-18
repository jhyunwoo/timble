import ProtectedPage from "../../../../components/ProtectedPage"

export default function AdminClasses() {
  return (
    <ProtectedPage>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div>admin classes</div>
      </div>
    </ProtectedPage>
  )
}
