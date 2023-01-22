import useUser from "../../../lib/client/useUser"
import useSchool from "../../../lib/client/useSchool"

import ProtectedPage from "../../../components/ProtectedPage"
import DataCard from "../../../components/DataCard"
import useStudents from "../../../lib/client/useStudents"
import useSubjects from "../../../lib/client/useSubjects"

export default function SchoolAdminPage() {
  const { user } = useUser()
  const { school, color, diplomas } = useSchool()
  const { students } = useStudents()
  const { subjects } = useSubjects()
  return (
    <ProtectedPage>
      <div className="sm:grid-cols-24 grid grid-cols-2 gap-4 p-4 lg:grid-cols-6 xl:grid-cols-8">
        <div
          className={`col-span-2 flex items-center justify-center rounded-lg bg-blue-500 p-4 text-white shadow-lg transition duration-200 hover:shadow-xl`}
          onClick={() => console.log(color)}
        >
          <div className="mx-4 text-2xl font-bold">{school}</div>
        </div>

        <DataCard link={`/admin/${user ? user.admin : null}/students`} title={"학생"}>
          {students ? students.length : "..."}
        </DataCard>

        <DataCard link={`/admin/${user ? user.admin : null}/school/subjects`} title={"교과목"}>
          {subjects ? subjects.length : "..."}
        </DataCard>

        <DataCard link={`/admin/${user ? user.admin : null}/school/diploma`} title={"디플로마"}>
          {diplomas ? diplomas.length : "..."}
        </DataCard>
      </div>
    </ProtectedPage>
  )
}
