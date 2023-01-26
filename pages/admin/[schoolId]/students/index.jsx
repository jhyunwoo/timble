import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import { useEffect, useState } from "react"
import useStudents from "../../../../lib/client/useStudents"
import useDiplomas from "../../../../lib/client/useDiplomas"
import useGroups from "../../../../lib/client/useGroups"

export default function AdminStudents() {
  const { diplomas } = useDiplomas()
  const { groups } = useGroups()
  const { students } = useStudents()
  const [groupFilter, setGroupFilter] = useState()
  const [diplomaFilter, setDiplomaFilter] = useState("")
  const [filteredStudents, setFilteredStudents] = useState([])

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

  function filterStudents() {
    let list = students
    let filtered = []
    if (groupFilter && diplomaFilter) {
      try {
        list.map((data) => {
          if (data.studentgroup.id === groupFilter && data.diploma.name === diplomaFilter) {
            filtered.push(data)
          }
        })
      } catch {
        console.log("error on filtering year and diploma")
      }
      setFilteredStudents(filtered)
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
      setFilteredStudents(filtered)
    } else if (diplomaFilter) {
      try {
        list.map((data) => {
          if (data.diploma.name === diplomaFilter) {
            filtered.push(data)
          }
        })
      } catch {
        console.log("error on filtering diploma")
      }
      setFilteredStudents(filtered)
    } else {
      setFilteredStudents(list)
    }
  }

  useEffect(() => {
    filterStudents()
  }, [students, groupFilter, diplomaFilter])

  return (
    <ProtectedPage>
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        {groups
          ? groups.map((data, key) => (
              <button
                key={key}
                onClick={() => controlGroupFilter(data.id)}
                className={`${
                  groupFilter === data.id ? "bg-slate-800 text-white" : ""
                } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
              >
                {data.name}
              </button>
            ))
          : ""}
      </div>
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        {diplomas
          ? diplomas.sort().map((data, key) => (
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
      <div className="grid-col-1 m-2 grid rounded-lg bg-white">
        <div className="grid grid-cols-3 rounded-t-lg bg-slate-100 py-2 text-center font-semibold">
          <div>학년</div>
          <div>이름</div>
          <div>디플로마</div>
        </div>
        {filteredStudents
          ? filteredStudents.map((data, key) => (
              <div
                key={key}
                className={`grid grid-cols-3 py-1 text-center last:rounded-b-lg ${key % 2 === 1 ? "bg-slate-100" : ""}`}
              >
                <div>{data.studentgroup ? data.studentgroup.name : "..."}</div>
                <div>{data.name ? data.name : "..."}</div>
                <div>{data.diploma ? data.diploma.name : "..."}</div>
              </div>
            ))
          : ""}
      </div>
    </ProtectedPage>
  )
}
