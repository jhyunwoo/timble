import Loading from "../../../../../components/Loading"
import ProtectedPage from "../../../../../components/ProtectedPage"
import useSubjects from "../../../../../lib/client/useSubjects"
import useUser from "../../../../../lib/client/useUser"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState, useEffect } from "react"
import MoveBack from "../../../../../components/MoveBack"
import useDiplomas from "../../../../../lib/client/useDiplomas"
import useGroups from "../../../../../lib/client/useGroups"

export default function AdminSubjects() {
  const { user } = useUser()
  const { diplomas } = useDiplomas()
  const [diplomaFilter, setDiplomaFilter] = useState()
  const [groupFilter, setGroupFilter] = useState()
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const { subjects } = useSubjects()
  const { groups } = useGroups()

  function controlGroupFilter(data) {
    if (data === groupFilter) {
      setGroupFilter(null)
    } else {
      setGroupFilter(data)
    }
  }

  function controlDiplomaFilter(data) {
    if (data === diplomaFilter) {
      setDiplomaFilter(null)
    } else {
      setDiplomaFilter(data)
    }
  }

  function filterSubjects() {
    let list = subjects
    let filtered = []
    if (groupFilter && diplomaFilter) {
      try {
        list.map((data) => {
          data.diplomas.map((diplomaData) => {
            console.log(diplomaData)
            if (diplomaData.id === diplomaFilter && data.studentgroup.id === groupFilter) {
              filtered.push(data)
            }
          })
        })
      } catch {
        console.log("error on filtering year and diploma")
      }
      setFilteredSubjects(filtered)
    } else if (groupFilter) {
      try {
        list.map((data) => {
          if (data.studentgroup.id === groupFilter) {
            filtered.push(data)
          }
        })
      } catch {
        console.log("error on filtering year")
      }
      setFilteredSubjects(filtered)
    } else if (diplomaFilter) {
      try {
        list.map((data) => {
          data.diplomas.map((diplomaData) => {
            if (diplomaData.id === diplomaFilter) {
              filtered.push(data)
            }
            console.log(diplomaData)
          })
        })
      } catch {
        console.log("error on filtering diploma")
      }
      setFilteredSubjects(filtered)
    } else {
      setFilteredSubjects(list)
    }
  }
  useEffect(() => {
    filterSubjects()
  }, [diplomaFilter, subjects, groupFilter])

  return (
    <ProtectedPage>
      <MoveBack title={"학교"} />

      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        {diplomas
          ? diplomas.map((data, key) => (
              <button
                onClick={() => controlDiplomaFilter(data.id)}
                className={`${
                  diplomaFilter === data.id ? "bg-slate-800 text-white" : ""
                } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
                key={key}
              >
                {data.name}
              </button>
            ))
          : ""}
      </div>
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        {groups
          ? groups.map((data, key) => (
              <button
                onClick={() => controlGroupFilter(data.id)}
                className={`${
                  groupFilter === data.id ? "bg-slate-800 text-white" : ""
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
            <Link key={key} href={`/admin/${user ? user.admin : null}/school/subjects/${data.id}`}>
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
                    {data.title} ({data.studentgroup ? data.studentgroup.name : "미정"})
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
