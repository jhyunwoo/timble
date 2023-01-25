import useUser from "../../../lib/client/useUser"
import useSchool from "../../../lib/client/useSchool"

import ProtectedPage from "../../../components/ProtectedPage"
import DataCard from "../../../components/DataCard"
import useStudents from "../../../lib/client/useStudents"
import useSubjects from "../../../lib/client/useSubjects"
import { useState, useEffect } from "react"
import SchoolName from "../../../components/SchoolName"

export default function SchoolAdminPage() {
  const { user } = useUser()
  const { diplomas } = useSchool()
  const { students } = useStudents()
  const { subjects } = useSubjects()

  return (
    <ProtectedPage>
      <div className="sm:grid-cols-2 grid grid-cols-2 gap-4 p-4 lg:grid-cols-6 xl:grid-cols-8">
        <SchoolName />
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
