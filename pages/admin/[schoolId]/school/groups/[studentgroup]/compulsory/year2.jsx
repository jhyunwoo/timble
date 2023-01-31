import ProtectedPage from "../../../../../../../components/ProtectedPage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGroupSubjects from "../../../../../../../lib/client/useGroupSubjects"
import MoveBack from "../../../../../../../components/MoveBack"
import useGroup from "../../../../../../../lib/client/useGroup"
import axios from "axios"
import Loading from "../../../../../../../components/Loading"
import { mutate } from "swr"

export default function Year2() {
  const router = useRouter()
  const { group } = useGroup(groupId())
  const [filteredSubject1, setFilteredSubject1] = useState()
  const [selected1, setSelected1] = useState([])
  const [filteredSubject2, setFilteredSubject2] = useState()
  const [selected2, setSelected2] = useState([])
  const [loading, setLoading] = useState(false)
  const [warn, setWarn] = useState(false)

  const { groupSubjects } = useGroupSubjects(groupId())
  function groupId() {
    return router.query.studentgroup
  }
  function schoolId() {
    return router.query.schoolId
  }

  function get21Essential() {
    let essential
    if (group) {
      group.essentials.map((data) => {
        if (data.semester === "2-1") {
          essential = data.id
        }
      })
    }
    return essential
  }
  function get22Essential() {
    let essential
    if (group) {
      group.essentials.map((data) => {
        if (data.semester === "2-2") {
          essential = data.id
        }
      })
    }
    return essential
  }

  function filter1() {
    let subjects = []
    if (groupSubjects) {
      groupSubjects.map((data) => {
        if (data.open.includes("2-1")) {
          subjects.push(data)
        }
      })
    }
    setFilteredSubject1(subjects)
  }
  function filter2() {
    let subjects = []
    if (groupSubjects) {
      groupSubjects.map((data) => {
        if (data.open.includes("2-2")) {
          subjects.push(data)
        }
      })
    }
    setFilteredSubject2(subjects)
  }

  function controlSubject1(data) {
    setWarn(false)
    if (selected1.includes(data)) {
      setSelected1(selected1.filter((subject) => subject !== data))
    } else {
      setSelected1([data, ...selected1])
    }
  }

  function controlSubject2(data) {
    setWarn(false)
    if (selected2.includes(data)) {
      setSelected2(selected2.filter((subject) => subject !== data))
    } else {
      setSelected2([data, ...selected2])
    }
  }

  async function updateData() {
    function mutateData() {
      mutate(`/api/schools/groups?id=${groupId()}`)
    }
    await setTimeout(mutateData, 1000)
  }

  function makeListSubjectId1() {
    let list = []
    selected1.map((data) => {
      list.push({ id: data })
    })
    return list
  }

  function makeListSubjectId2() {
    let list = []
    selected2.map((data) => {
      list.push({ id: data })
    })
    return list
  }

  async function postEssential1() {
    if (group) {
      if (!get21Essential()) {
        if (selected1.length > 0) {
          setLoading(true)
          await axios.post("/api/schools/essential", {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId1(),
              semester: "2-1",
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
        if (selected1.length > 0) {
          setLoading(true)
          await axios.put(`/api/schools/essential?id=${get21Essential()}`, {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId1(),
              semester: "2-1",
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

  async function postEssential2() {
    if (group) {
      if (!get22Essential()) {
        if (selected2.length > 0) {
          setLoading(true)
          await axios.post("/api/schools/essential", {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId2(),
              semester: "2-2",
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
        if (selected2.length > 0) {
          setLoading(true)
          await axios.put(`/api/schools/essential?id=${get22Essential()}`, {
            data: {
              groupId: groupId(),
              subjects: makeListSubjectId2(),
              semester: "2-2",
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
    filter1()
    filter2()
  }, [groupSubjects])

  useEffect(() => {
    if (group) {
      if (group.essentials.length > 0) {
        group.essentials.map((data) => {
          if (data.semester === "2-1") {
            let subjects = []
            data.subjects.map((essentialData) => {
              subjects.push(essentialData.id)
            })
            setSelected1(subjects)
          } else if (data.semester === "2-2") {
            let subjects = []
            data.subjects.map((essentialData) => {
              subjects.push(essentialData.id)
            })
            setSelected2(subjects)
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
        <div className="text-2xl font-bold">2학년 필수 이수 과목 설정</div>
        <div className="pt-4 text-xl font-semibold">2학년 1학기</div>
        <div className="grid grid-cols-2 gap-2 my-4">
          {filteredSubject1
            ? filteredSubject1.map((data, key) => (
                <button
                  key={key}
                  onClick={() => controlSubject1(data.id)}
                  className={` p-2 px-4 rounded-md transition duration-200 ${
                    selected1.includes(data.id) ? "bg-slate-800 text-white" : "bg-slate-100"
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
            onClick={() => postEssential1()}
            className="bg-green-500 text-white p-2 px-8 rounded-full hover:bg-green-600 hover:shadow-md transition duration-200"
          >
            제출
          </button>
        </div>
        <div className="pt-4 text-xl font-semibold">2학년 2학기</div>
        <div className="grid grid-cols-2 gap-2 my-4">
          {filteredSubject2
            ? filteredSubject2.map((data, key) => (
                <button
                  key={key}
                  onClick={() => controlSubject2(data.id)}
                  className={` p-2 px-4 rounded-md transition duration-200 ${
                    selected2.includes(data.id) ? "bg-slate-800 text-white" : "bg-slate-100"
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
            onClick={() => postEssential2()}
            className="bg-green-500 text-white p-2 px-8 rounded-full hover:bg-green-600 hover:shadow-md transition duration-200"
          >
            제출
          </button>
        </div>
      </div>
    </ProtectedPage>
  )
}
