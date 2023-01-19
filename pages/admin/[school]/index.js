import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import useUser from "../../../lib/client/useUser"
import useSchool from "../../../lib/client/useSchool"

import ProtectedPage from "../../../components/ProtectedPage"
import DataCard from "../../../components/DataCard"

export default function SchoolAdminPage() {
  const { status } = useSession()
  const router = useRouter()
  const { user } = useUser()
  const { students, school, color, subjects, diplomas } = useSchool()

  return (
    <ProtectedPage>
      <div className="sm:grid-cols-24 grid grid-cols-2 gap-4 p-4 lg:grid-cols-6 xl:grid-cols-8">
        <div
          className={`col-span-2 rounded-lg bg-blue-500 p-4 text-white shadow-lg transition duration-200 hover:shadow-xl`}
          onClick={() => console.log(color)}
        >
          <div className="mx-4 text-center text-2xl font-bold">{school}</div>
        </div>

        <DataCard
          link={`/admin/${user ? user.admin : null}/students`}
          title={"학생"}
        >
          {students ? students.length : "loading..."}
        </DataCard>

        <DataCard
          link={`/admin/${user ? user.admin : null}/school/subjects`}
          title={"교과목"}
        >
          {subjects ? subjects.length : "loading..."}
        </DataCard>

        <DataCard
          link={`/admin/${user ? user.admin : null}/school/diploma`}
          title={"디플로마"}
        >
          {diplomas ? diplomas.length : "loading..."}
        </DataCard>
      </div>
    </ProtectedPage>
  )
}
