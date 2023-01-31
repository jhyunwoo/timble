import ProtectedPage from "../../../../../../../components/ProtectedPage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"
import MoveBack from "../../../../../../../components/MoveBack"
import useGroup from "../../../../../../../lib/client/useGroup"
import axios from "axios"
import Loading from "../../../../../../../components/Loading"
import { mutate } from "swr"

export default function Year1() {
  const router = useRouter()
  const { group } = useGroup(groupId())
  const [filteredSubject, setFilteredSubject] = useState()
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [warn, setWarn] = useState(false)

  const { groupSubjects } = useGroupSubjects(groupId())
  function groupId() {
    return router.query.studentgroup
  }
  function schoolId() {
    return router.query.schoolId
  }

  function getYear1Essential() {
    let year1Essential
    if (group) {
      group.essentials.map((data) => {
        if (data.semester === "1") {
          year1Essential = data.id
        }
      })
    }
    return year1Essential
  }

  function filter() {
    let subjects = []
    if (groupSubjects) {
      groupSubjects.map((data) => {
        if (data.open.includes("1-1") || data.open.includes("1-2")) {
          subjects.push(data)
        }
      })
    }
    setFilteredSubject(subjects)
  }

  function controlSubject(data) {
    setWarn(false)
    if (selected.includes(data)) {
      setSelected(selected.filter((subject) => subject !== data))
    } else {
      setSelected([data, ...selected])
    }
  }
  async function updateData() {
    function mutateData() {
      mutate(`/api/schools/groups?id=${groupId()}`)
    }
    await setTimeout(mutateData, 1000)
  }

  function makeListSubjectId() {
    let list = []
    selected.map((data) => {
      list.push({ id: data })
    })
    return list
  }

  async function postEssential() {
    if (group) {
      if (!getYear1Essential()) {
        if (selected.length > 0) {
          setLoading(true)
          await axios.post("/api/schools/essential", {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId(),
              semester: "1",
            },
          })
          setWarn(false)
          updateData()
          setLoading(false)
          router.replace(`/admin/${schoolId()}/school/groups/${groupId()}/compulsory`)
        } else {
          setWarn(true)
        }
      } else {
        if (selected.length > 0) {
          setLoading(true)
          await axios.put(`/api/schools/essential?id=${getYear1Essential()}`, {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId(),
              semester: "1",
            },
          })
          setWarn(false)
          updateData()
          setLoading(false)
          router.replace(`/admin/${schoolId()}/school/groups/${groupId()}/compulsory`)
        } else {
          setWarn(true)
        }
      }
    }
  }

  useEffect(() => {
    filter()
  }, [groupSubjects])

  useEffect(() => {
    if (group) {
      if (group.essentials.length > 0) {
        group.essentials.map((data) => {
          if (data.semester === "1") {
            let subjects = []
            data.subjects.map((essentialData) => {
              subjects.push(essentialData.id)
            })
            setSelected(subjects)
          }
        })
      }
    }
  }, [group])

  return (
    <ProtectedPage>
      {loading ? <Loading /> : ""}
      <MoveBack title="필수 이수 과목 설정" link={`/admin/${schoolId()}/school/groups/${groupId()}/compulsory`} />
      <div className="p-4">
        <div className="text-2xl font-bold">1학년 필수 이수 과목 설정</div>
        <div className="grid grid-cols-2 gap-2 my-4">
          {filteredSubject
            ? filteredSubject.map((data, key) => (
                <button
                  key={key}
                  onClick={() => controlSubject(data.id)}
                  className={` p-2 px-4 rounded-md transition duration-200 ${
                    selected.includes(data.id) ? "bg-slate-800 text-white" : "bg-slate-100"
                  }`}
                >
                  <div>{data.title}</div>
                </button>
              ))
            : null}
        </div>
        {warn ? <div>필수 이수 과목을 선택하세요</div> : ""}
        <div className="w-full p-4 flex justify-center items-center">
          <button
            onClick={() => postEssential()}
            className="bg-green-500 text-white p-2 px-8 rounded-full hover:bg-green-600 hover:shadow-md transition duration-200"
          >
            제출
          </button>
        </div>
      </div>
    </ProtectedPage>
  )
}
