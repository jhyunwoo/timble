import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import useUser from "../../../../lib/client/useUser"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function AdminStudents() {
  const { students, diplomas } = useSchool()
  const { user } = useUser()
  const [filter, setFilter] = useState("")
  function controlFilter(data) {
    if (data === filter) {
      setFilter("")
    } else {
      setFilter(data)
    }
  }
  return (
    <ProtectedPage>
      <div className="overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
        <button
          onClick={() => controlFilter("1학년")}
          className={`${
            filter === "1학년" ? "bg-slate-800 text-white" : ""
          } rounded-md px-4 hover:bg-slate-800 hover:text-white transition duration-200 border-2 border-slate-900 p-1 m-1`}
        >
          1학년
        </button>
        <button
          onClick={() => controlFilter("2학년")}
          className={`${
            filter === "2학년" ? "bg-slate-800 text-white" : ""
          } rounded-md px-4 hover:bg-slate-800 hover:text-white transition duration-200 border-2 border-slate-900 p-1 m-1`}
        >
          2학년
        </button>
        <button
          onClick={() => controlFilter("3학년")}
          className={`${
            filter === "3학년" ? "bg-slate-800 text-white" : ""
          } rounded-md px-4 hover:bg-slate-800 hover:text-white transition duration-200 border-2 border-slate-900 p-1 m-1`}
        >
          3학년
        </button>
        {diplomas
          ? diplomas.map((data, key) => (
              <button
                onClick={() => controlFilter(data.name)}
                className={`${
                  filter === data.name ? "bg-slate-800 text-white" : ""
                } rounded-md px-4 hover:bg-slate-800 hover:text-white transition duration-200 border-2 border-slate-900 p-1 m-1`}
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
        {students
          ? students.map((data, key) => (
              <div
                key={key}
                className={`grid grid-cols-3 py-1 text-center last:rounded-b-lg ${
                  key % 2 === 1 ? "bg-slate-100" : ""
                }`}
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
