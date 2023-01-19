import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import useUser from "../../../../lib/client/useUser"

export default function AdminStudents() {
  const { students } = useSchool()
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div
        onClick={() => console.log(students)}
        className="grid-col-1 m-2 grid rounded-lg bg-white"
      >
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
