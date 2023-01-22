import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import { useEffect, useState } from "react"
import useStudents from "../../../../lib/client/useStudents"

export default function AdminStudents() {
  const { diplomas } = useSchool()
  const { students } = useStudents()
  const [yearFilter, setYearFilter] = useState()
  const [diplomaFilter, setDiplomaFilter] = useState("")
  const [filteredStudents, setFilteredStudents] = useState([])

  function controlYearFilter(data) {
    if (data === yearFilter) {
      setYearFilter(null)
    } else {
      setYearFilter(data)
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
    if (yearFilter && diplomaFilter) {
      list.map((data) => {
        if (data.year === yearFilter && data.diploma.name === diplomaFilter) {
          filtered.push(data)
        }
      })
      setFilteredStudents(filtered)
    } else if (yearFilter) {
      list.map((data) => {
        if (data.year === yearFilter) {
          filtered.push(data)
        }
      })
      setFilteredStudents(filtered)
    } else if (diplomaFilter) {
      list.map((data) => {
        if (data.diploma.name === diplomaFilter) {
          filtered.push(data)
        }
      })
      setFilteredStudents(filtered)
    } else {
      setFilteredStudents(list)
    }
  }

  useEffect(() => {
    filterStudents()
  }, [students, yearFilter, diplomaFilter])

  return (
    <ProtectedPage>
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        <button
          onClick={() => controlYearFilter(1)}
          className={`${
            yearFilter === 1 ? "bg-slate-800 text-white" : ""
          } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
        >
          1학년
        </button>
        <button
          onClick={() => controlYearFilter(2)}
          className={`${
            yearFilter === 2 ? "bg-slate-800 text-white" : ""
          } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
        >
          2학년
        </button>
        <button
          onClick={() => controlYearFilter(3)}
          className={`${
            yearFilter === 3 ? "bg-slate-800 text-white" : ""
          } rounded-xl bg-slate-100 px-4 hover:shadow-sm  transition duration-200 p-1 m-1`}
        >
          3학년
        </button>
      </div>
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
                <div>{data.year}</div>
                <div>{data.name}</div>
                <div>{data.diploma["name"]}</div>
              </div>
            ))
          : ""}
      </div>
    </ProtectedPage>
  )
}
