import ProtectedPage from "../../../components/ProtectedPage"
import DataCard from "../../../components/DataCard"
import useStudents from "../../../lib/client/useStudents"
import useSubjects from "../../../lib/client/useSubjects"
import useDiplomas from "../../../lib/client/useDiplomas"
import SchoolName from "../../../components/SchoolName"
import useSchool from "../../../lib/client/useSchool"

export default function SchoolAdminPage() {
  const { diplomas } = useDiplomas()
  const { students } = useStudents()
  const { subjects } = useSubjects()
  const { school } = useSchool()

  return (
    <ProtectedPage>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        <SchoolName />
        <DataCard link={`/admin/${school ? school.code : null}/students`} title={"학생"}>
          {students ? students.length : "..."}
        </DataCard>

        <DataCard link={`/admin/${school ? school.code : null}/school/subjects`} title={"교과목"}>
          {subjects ? subjects.length : "..."}
        </DataCard>

        <DataCard link={`/admin/${school ? school.code : null}/school/diploma`} title={"디플로마"}>
          {diplomas ? diplomas.length : "..."}
        </DataCard>
      </div>
    </ProtectedPage>
  )
}
