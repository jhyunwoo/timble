import ProtectedPage from "../../../../../../../../components/ProtectedPage"
import useSchool from "../../../../../../../../lib/client/useSchool"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { PlusCircleIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { mutate } from "swr"
import useSubject from "../../../../../../../../lib/client/useSubject"
import MoveBack from "../../../../../../../../components/MoveBack"
import useDiplomas from "../../../../../../../../lib/client/useDiplomas"
import useAreas from "../../../../../../../../lib/client/useAreas"
import useTypes from "../../../../../../../../lib/client/useTypes"
import useDifficulties from "../../../../../../../../lib/client/useDifficulties"
import useGroups from "../../../../../../../../lib/client/useGroups"
import useGroupSubjects from "../../../../../../../../lib/client/useGroupSubjects"
export default function AdminSubjectEdit() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const { school } = useSchool()
  const { areas } = useAreas()
  const { types } = useTypes()
  const { difficulties } = useDifficulties()
  const { diplomas } = useDiplomas()
  const { groupSubjects } = useGroupSubjects(router ? groupId() : null)
  const {groups}=useGroups()
  const [diploma, setDiploma] = useState([])
  const [prerequisite, setPrerequisite] = useState([])
  const [type, setType] = useState("")
  const [area, setArea] = useState("")
  const [group, setGroup] = useState("")
  const [open, setOpen] = useState([])
  const [csat, setCsta] = useState(0)
  const [difficulty, setDifficulty] = useState("")
  const [contentLength, setContentLength] = useState(1)
  const { subject } = useSubject(subjectId())

  function subjectId() {
    return router.query.subject
  }
  function groupId() {
    return router.query.studentgroup
  }

  async function updateSubject(data, content) {
    await axios.put(`/api/schools/subjects?id=${subject.id}`, {
      data: {
        code: school.code,
        title: data.subjectTitle,
        type: data.subjectType,
        diplomaId: data.subjectDiplomas,
        area: data.subjectArea,
        csat: data.subjectCSAT,
        open: data.subjectOpen,
        prerequisite: data.subjectPrerequisite,
        relatedMajor: data.subjectRelatedMajor,
        target: data.subjectTarget,
        targetParticipants: data.subjectTargetParticipants,
        contents: content,
        difficulty: difficulty,
        group: group,
      },
    })
  }
  async function deleteSubject() {
    await axios.delete(`/api/schools/subjects?id=${subjectId()}`)
    router.replace(`/admin/${school ? school.code : null}/school/groups/${groupId()}/subjects`)
    updateData()
  }
  function updateData() {
    function mutateData() {
      mutate(`/api/schools/subjects?id=${subject ? subject.id : null}`)
    }
    setTimeout(mutateData, 2000)
  }

  const onSubmit = (data) => {
    let unifyContent = []
    for (let i = 1; i < contentLength; i++) {
      unifyContent.push({
        id: subject.contents[i - 1] ? subject.contents[i - 1].id : "newContent",
        area: data[`contentArea${i}`],
        mainTarget: data[`contentMainTarget${i}`],
        detail: data[`contentDetail${i}`],
      })
    }
    updateSubject(data, unifyContent)
    router.push(`/admin/${school ? school.code : null}/school/groups/${groupId()}/subjects/${subjectId()}`)
  }

  function range(start, end) {
    let array = []
    for (let i = start; i < end; ++i) {
      array.push(i)
    }
    return array
  }

  function controlDiplomaSelect(data) {
    let filterDiploma = diploma
    if (filterDiploma.includes(data)) {
      setDiploma(filterDiploma.filter((element) => element !== data))
    } else {
      setDiploma([data, ...diploma])
    }
  }
  function controlPrerequisiteSelect(data) {
    let filterPrerequisite = prerequisite
    if (filterPrerequisite.includes(data)) {
      setPrerequisite(filterPrerequisite.filter((element) => element !== data))
    } else {
      setPrerequisite([data, ...prerequisite])
    }
  }
  function controlTypeSelect(data) {
    if (data === type) {
      setType("")
    } else {
      setType(data)
    }
  }
  function controlGroupSelect(data) {
    if (data === group) {
      setGroup("")
    } else {
      setGroup(data)
    }
  }
  function controlAreaeSelect(data) {
    if (data === area) {
      setArea("")
    } else {
      setArea(data)
    }
  }
  function controlOpenSelect(data) {
    let filterOpen = open
    if (filterOpen.includes(data)) {
      setOpen(filterOpen.filter((element) => element !== data))
    } else {
      setOpen([data, ...open])
    }
  }
  function controlDifficultySelect(data) {
    if (data === difficulty) {
      setDifficulty("")
    } else {
      setDifficulty(data)
    }
  }

  useEffect(() => {
    setValue("subjectArea", area)
  }, [area])
  useEffect(() => {
    setValue("subjectDiplomas", diploma)
  }, [diploma])
  useEffect(() => {
    setValue("subjectOpen", open)
  }, [open])
  useEffect(() => {
    setValue("subjectPrerequisite", prerequisite)
  }, [prerequisite])
  useEffect(() => {
    setValue("subjectType", type)
  }, [type])
  useEffect(() => {
    setValue("subjectGroup", group)
  }, [group])
  useEffect(() => {
    setValue("subjectCSAT", csat)
  }, [csat])
  useEffect(() => {
    setValue("subjectDifficulty", difficulty)
  }, [difficulty])

  useEffect(() => {
    if (subject) {
      reset({
        subjectTitle: subject.title,
        subjectTargetParticipants: subject.targetParticipants,
        subjectTarget: subject.target,
        subjectRelatedMajor: subject.relatedMajor,
      })
      for (let i = 1; i < contentLength; i++) {
        if (subject.contents[i - 1]) {
          setValue(`contentArea${i}`, subject.contents[i - 1].area)
          setValue(`contentDetail${i}`, subject.contents[i - 1].detail)
          setValue(`contentMainTarget${i}`, subject.contents[i - 1].mainTarget.join("/"))
        }
      }
    }
  }, [contentLength, reset, setValue, subject])

  useEffect(() => {
    if (subject) {
      let setDip = []
      subject.diplomas.map((data) => {
        setDip.push(data.id)
      })
      setDiploma(setDip)
      let setPre = []
      subject.prerequisite.map((data) => setPre.push(data.id))
      setPrerequisite(setPre)
      setType(subject.type.id)
      setDifficulty(subject.difficulty.id)
      setArea(subject.area.id)
      setOpen(subject.open)
      setCsta(subject.CSATSubject)
      setContentLength(subject.contents.length + 1)
      setGroup(subject.studentgroupId)
    }
  }, [subject])

  return (
    <ProtectedPage>
      <MoveBack
        title={`${subject ? subject.title : ""}`}
        link={`/admin/${school ? school.code : null}/school/groups/${groupId()}/subjects/${subjectId()}`}
      />
      <div className="w-full h-full p-4">
        <div className="flex justify-between items-center p-2">
          <div className="text-2xl font-bold">교과목 수정</div>
          <button
            className="w-8 h-8 bg-red-500 hover:bg-red-600 transition duration-200 rounded-lg p-2"
            onClick={() => {
              deleteSubject()
            }}
          >
            <TrashIcon className="  text-white" />
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-lg font-semibold mt-2">교과목</div>
            <input
              className="bg-slate-100 rounded-md outline-none focus:outline-blue-500 focus:outline-2 p-1 my-1"
              {...register("subjectTitle", { required: { value: true, message: "교과목을 입력하세요" } })}
            />
            <ErrorMessage
              errors={errors}
              name="subjectTitle"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div className="text-lg font-semibold mt-2">디플로마</div>
            <div
              {...register("subjectDiplomas", { required: { value: true, message: "디플로마를 입력하세요" } })}
              className="grid grid-cols-3 gap-2 text-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8"
            >
              {diplomas
                ? diplomas.map((data, key) => (
                    <button
                      type="button"
                      onClick={() => controlDiplomaSelect(data.id)}
                      key={key}
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        diploma.includes(data.id) ? "bg-slate-800 text-white" : ""
                      }`}
                    >
                      {data.name}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectDiplomas"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div {...register("subjectPrerequisite")} className="text-lg font-semibold mt-2">
              선수 과목
            </div>
            <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {groupSubjects
                ? groupSubjects.map((data, key) => (
                    <button
                      type="button"
                      onClick={() => controlPrerequisiteSelect(data.id)}
                      key={key}
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        prerequisite.includes(data.id) ? "bg-slate-800 text-white" : ""
                      }`}
                    >
                      {data.title}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectPrerequisite"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div
              {...register("subjectType", { required: { value: true, message: "종류를 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              종류
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {types
                ? types.map((data, key) => (
                    <button
                      key={key}
                      type="button"
                      className={`bg-slate-50 p-1 px-2 rounded-md ${type === data.id ? "bg-slate-800 text-white" : ""}`}
                      onClick={() => controlTypeSelect(data.id)}
                    >
                      {data.name}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectType"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div
              {...register("subjectDifficulty", { required: { value: true, message: "교과 난이도를 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              교과 난이도
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {difficulties
                ? difficulties.map((data, key) => (
                    <button
                      key={key}
                      type="button"
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        difficulty === data.id ? "bg-slate-800 text-white" : ""
                      }`}
                      onClick={() => controlDifficultySelect(data.id)}
                    >
                      {data.name}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectType"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div
              {...register("subjectArea", { required: { value: true, message: "교과영역을 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              교과 영역
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {areas
                ? areas.map((data, key) => (
                    <button
                      key={key}
                      type="button"
                      className={`bg-slate-50 p-1 px-2 rounded-md ${area === data.id ? "bg-slate-800 text-white" : ""}`}
                      onClick={() => controlAreaeSelect(data.id)}
                    >
                      {data.name}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectArea"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />
            <div
              {...register("subjectGroup", { required: { value: true, message: "학생 그룹을 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              학생 그룹
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {groups
                ? groups.map((data, key) => (
                    <button
                      key={key}
                      type="button"
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        group === data.id ? "bg-slate-800 text-white" : ""
                      }`}
                      onClick={() => controlGroupSelect(data.id)}
                    >
                      {data.name}
                    </button>
                  ))
                : ""}
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectGroup"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div className="text-lg font-semibold mt-2">수강 대상</div>
            <textarea
              className="w-full h-24 bg-slate-100 rounded-md outline-none focus:outline-blue-500 focus:outline-2 p-1 my-1"
              {...register("subjectTargetParticipants", {
                required: { value: true, message: "수강 대상을 입력하세요" },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="subjectTargetParticipants"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div
              {...register("subjectOpen", { required: { value: true, message: "개설 학기를 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              개설 학기
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("1-1") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("1-1")}
              >
                1-1
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("1-2") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("1-2")}
              >
                1-2
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("2-1") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("2-1")}
              >
                2-1
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("2-2") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("2-2")}
              >
                2-2
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("3-1") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("3-1")}
              >
                3-1
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${open.includes("3-2") ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlOpenSelect("3-2")}
              >
                3-2
              </button>
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectOpen"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div {...register("subjectCSAT")} className="text-lg font-semibold mt-2">
              수능 과목 여부
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${csat ? "bg-slate-800 text-white" : ""}`}
                onClick={() => setCsta(1)}
              >
                예
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${!csat ? "bg-slate-800 text-white" : ""}`}
                onClick={() => setCsta(0)}
              >
                아니요
              </button>
            </div>

            <div className="text-lg font-semibold mt-2">목표</div>
            <textarea
              className="w-full h-32 bg-slate-100 rounded-md outline-none focus:outline-blue-500 focus:outline-2 p-1 my-1"
              {...register("subjectTarget", { required: { value: true, message: "목표 입력하세요" } })}
            />
            <ErrorMessage
              errors={errors}
              name="subjectTarget"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div className="text-lg font-semibold mt-2">진로</div>
            <textarea
              className="w-full h-12 bg-slate-100 rounded-md outline-none focus:outline-blue-500 focus:outline-2 p-1 my-1"
              {...register("subjectRelatedMajor", { required: { value: true, message: "진로를 입력하세요" } })}
            />
            <ErrorMessage
              errors={errors}
              name="subjectRelatedMajor"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">{message}</p>
              )}
            />

            <div className="text-lg font-semibold mt-2">내용 체계</div>
            <div className=" w-full ">
              <div>
                {range(1, contentLength).map((data) => (
                  <div key={data} className="bg-slate-50 p-2 m-1 rounded-lg w-full">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold">{data}</div>
                      <button
                        onClick={() => setContentLength(contentLength - 1)}
                        className={`bg-slate-100 p-1 rounded-md hover:bg-slate-200 transition duration-200 ${
                          data === contentLength - 1 ? "" : "invisible"
                        }`}
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <div>영역</div>
                      <input
                        {...register(`contentArea${data}`, { required: { value: true, message: "영역을 입력하세요" } })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name={`contentArea${data}`}
                      render={({ message }) => (
                        <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">
                          {message}
                        </p>
                      )}
                    />
                    <div className="flex flex-col">
                      <div>주요 목표 ( / 로 구분)</div>
                      <textarea
                        {...register(`contentMainTarget${data}`, {
                          required: { value: true, message: "주요 목표를 입력하세요" },
                        })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name={`contentMainTarget${data}`}
                      render={({ message }) => (
                        <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">
                          {message}
                        </p>
                      )}
                    />
                    <div className="flex flex-col">
                      <div>새부 사항</div>
                      <textarea
                        {...register(`contentDetail${data}`, {
                          required: { value: true, message: "세부 사항을 입력하세요" },
                        })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name={`contentDetail${data}`}
                      render={({ message }) => (
                        <p className="bg-red-500 text-white p-1 px-2 rounded-lg animate-pulse text-sm my-2">
                          {message}
                        </p>
                      )}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setContentLength(contentLength + 1)}
                className="mx-auto w-4/5 bg-slate-200 flex justify-center items-center p-1 px-2 rounded-lg"
              >
                <PlusCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full flex justify-center items-center p-2">
              <button
                type="submit"
                className="bg-green-500 text-lg font-semibold -mb-4 mt-4  text-white p-2 px-12 rounded-full hover:bg-green-600 duration-200 transition"
              >
                제출
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedPage>
  )
}
