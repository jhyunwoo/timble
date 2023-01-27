import LayOut from "../../../components/LayOut"
import MoveBack from "../../../components/MoveBack"
import useSubjects from "../../../lib/client/useSubjects"
import Link from "next/link"
import useDiplomas from "../../../lib/client/useDiplomas"

export default function Class() {
  const { subjects } = useSubjects()
  const { diplomas } = useDiplomas()
  return (
    <LayOut pageLocation={"timetable"}>
      <MoveBack title={"시간표"} link={"/timetable"} />
      <div className="p-4">
        <div className="text-2xl font-bold">교과 정보</div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {subjects
            ? subjects.map((data, key) => (
                <Link key={key} href={`/timetable/class/${data.id}`}>
                  <div className="bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition duration-200">
                    <div className="text-sm font-normal text-slate-500 transition duration-1000 flex flex-row w-full flex-wrap">
                      {data.diplomas.length > 0 && diplomas ? (
                        data.diplomas.length !== diplomas.length ? (
                          data.diplomas.map((data, key) => (
                            <div key={key} className="mx-1">
                              {data.name}
                            </div>
                          ))
                        ) : (
                          <div key={key} className="mx-1">
                            모든 과정
                          </div>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="text-2xl font-semibold my-2">{data.title}</div>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      </div>
    </LayOut>
  )
}
