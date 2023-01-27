import Loading from "../../../../../../../components/Loading"
import ProtectedPage from "../../../../../../../components/ProtectedPage"
import useSubjects from "../../../../../../../lib/client/useSubjects"
import useUser from "../../../../../../../lib/client/useUser"
import useSchool from "../../../../../../../lib/client/useSchool"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState, useEffect } from "react"
import MoveBack from "../../../../../../../components/MoveBack"
import useDiplomas from "../../../../../../../lib/client/useDiplomas"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"
import { useRouter } from "next/router"
import useGroup from "../../../../../../../lib/client/useGroup"

export default function AdminSubjects() {
  const router = useRouter()
  const { school } = useSchool()
  const { user } = useUser()
  const { diplomas } = useDiplomas()
  const [diplomaFilter, setDiplomaFilter] = useState("")
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const { groupSubjects } = useGroupSubjects(getGroupId())
  const { group } = useGroup(getGroupId())

  function getGroupId() {
    let path = router.asPath
    path = path.replace("/admin/cnsa/school/groups/", "")
    path = path.replace("/subjects", "")
    return path
  }

  function controlDiplomaFilter(data) {
    if (data === diplomaFilter) {
      setDiplomaFilter(null)
    } else {
      setDiplomaFilter(data)
    }
  }
  function filterSubjects() {
    let list = groupSubjects
    let filtered = []
    if (diplomaFilter) {
      list.map((data) => {
        let i
        for (i = 0; i < data.diplomas.length; i++) {
          if (data.diplomas[i].name === diplomaFilter) {
            filtered.push(data)
          }
        }
      })
      setFilteredSubjects(filtered)
    } else {
      setFilteredSubjects(list)
    }
  }

  useEffect(() => {
    filterSubjects()
  }, [diplomaFilter, groupSubjects])

  return (
    <ProtectedPage>
      <MoveBack
        title={group ? group.name : ""}
        link={`/admin/${school ? school.code : null}/school/groups/${getGroupId()}`}
      />

      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        {diplomas
          ? diplomas.map((data, key) => (
              <button
                onClick={() => controlDiplomaFilter(data.name)}
                className={`${
                  diplomaFilter === data.name ? "bg-slate-800 text-white" : ""
                } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
                key={key}
              >
                {data.name}
              </button>
            ))
          : ""}
      </div>
      {filteredSubjects ? (
        <div className={"grid grid-cols-1 p-4 gap-4"}>
          {filteredSubjects.map((data, key) => (
            <Link
              key={key}
              href={`/admin/${user ? user.admin : null}/school/groups/${getGroupId()}/subjects/${data.id}`}
            >
              <div className="bg-white p-4 shadow-lg rounded-lg flex justify-between hover:shadow-xl transition duration-200">
                <div className="my-1 w-full">
                  <div className="text-sm font-normal text-slate-500 transition duration-1000 flex flex-row w-full flex-wrap">
                    {diplomas && data.diplomas.length !== diplomas.length ? (
                      data.diplomas.map((data, key) => (
                        <div key={key} className="mx-1">
                          {data.name}
                        </div>
                      ))
                    ) : (
                      <div key={key} className="mx-1">
                        모든 과정
                      </div>
                    )}
                  </div>
                  <div className="text-xl mt-1 font-semibold text-slate-900 group-hover:text-slate-50 transition duration-200">
                    {data.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link href={`/admin/${user ? user.admin : null}/school/subjects/add`}>
            <div className=" bg-white p-4 hover:bg-slate-800 group hover:text-white shadow-lg rounded-lg flex justify-center hover:shadow-xl transition duration-200">
              <DocumentPlusIcon className="w-6 h-6" />
            </div>
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </ProtectedPage>
  )
}
