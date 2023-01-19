import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import useUser from "../../../../lib/client/useUser"

export default function AdminStudents() {
  const { students } = useSchool()
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div onClick={() => console.log(user)}>
        {students
          ? students.map((data, key) => <div key={key}>{data.name}</div>)
          : ""}
      </div>
    </ProtectedPage>
  )
}
