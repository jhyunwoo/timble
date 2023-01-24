import ProtectedPage from "../../../../../../components/ProtectedPage"
import useSubjects from "../../../../../../lib/client/useSubjects"
import useSchool from "../../../../../../lib/client/useSchool"
import useUser from "../../../../../../lib/client/useUser"
import { dataUpdateState } from "../../../../../../components/recoil/states"
import { useSetRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { PlusCircleIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { mutate } from "swr"
import useSubject from "../../../../../../lib/client/useSubject"
import MoveBack from "../../../../../../components/moveBack"

export default function AdminSubjectEdit() {
  const router = useRouter()
  const { code } = useSchool()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const { diplomas, id } = useSchool()
  const { subjects } = useSubjects()
  const { user } = useUser()
  const [diploma, setDiploma] = useState([])
  const [prerequisite, setPrerequisite] = useState([])
  const [type, setType] = useState("")
  const [area, setArea] = useState("")
  const [open, setOpen] = useState([])
  const [csat, setCsta] = useState(0)
  const [difficulty, setDifficulty] = useState("")
  const [contentLength, setContentLength] = useState(1)
  const controlUpdate = useSetRecoilState(dataUpdateState)
  const { subject } = useSubject(subjectID())

  function subjectID() {
    let beforeEdit = router.asPath.replace(`/admin/${code}/school/subjects/`, "")
    return Number(beforeEdit.replace("/edit", ""))
  }

  async function updateSubject(data, content) {
    await axios.post("/api/adminPost", {
      post: "adminUpdateSubject",
      id: subject.id,
      schoolId: id,
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
    })
  }
  async function deleteSubject() {
    controlUpdate(true)
    await axios.post("/api/adminPost", {
      post: "adminDeleteSubject",
      id: subject.id,
    })
    router.push(`/admin/${code}/school/subjects`)
    updateData()
    controlUpdate(false)
  }
  function updateData() {
    function mutateData() {
      mutate([user ? "/api/getSubjects" : null, user ? user.schoolId : null])
    }
    setTimeout(mutateData, 2000)
  }

  const onSubmit = (data) => {
    let unifyContent = []
    for (let i = 1; i < contentLength; i++) {
      unifyContent.push({
        id: subject.content[i - 1].id,
        area: data[`contentArea${i}`],
        mainTarget: data[`contentMainTarget${i}`],
        detail: data[`contentDetail${i}`],
      })
    }
    updateSubject(data, unifyContent)
    router.push(`/admin/${code}/school/subjects/${subject.id}`)
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
    setValue("subjectCSAT", csat)
  }, [csat])
  useEffect(() => {
    setValue("subjectDifficulty", difficulty)
  }, [difficulty])

  useEffect(() => {
    if (diplomas) {
      reset({
        subjectTitle: subject.title,
        subjectTargetParticipants: subject.targetParticipants,
        subjectTarget: subject.target,
        subjectRelatedMajor: subject.relatedMajor,
      })
      for (let i = 1; i < contentLength; i++) {
        setValue(`contentArea${i}`, subject.content[i - 1].area)
        setValue(`contentDetail${i}`, subject.content[i - 1].detail)
        setValue(`contentMainTarget${i}`, subject.content[i - 1].mainTarget.join("/"))
      }
    }
  }, [diplomas, reset, contentLength, setValue])

  useEffect(() => {
    if (subject) {
      let setDip = []
      subject.diplomas.map((data) => {
        setDip.push(data.id)
      })
      setDiploma(setDip)
    }
    if (subject) {
      let setPre = []
      subject.prerequisite.map((data) => setPre.push(data.id))
      setPrerequisite(setPre)
      setType(subject.type)
      setDifficulty(subject.difficulty)
      setArea(subject.subjectArea)
      setOpen(subject.open)
      setCsta(subject.CSATSubject)
      setContentLength(subject.content.length + 1)
    }
  }, [subject])

  return (
    <ProtectedPage>
      <MoveBack title={`${subject ? subject.title : ""}`} link={`/admin/${code}/school/subjects/${subjectID()}`} />
      <div className="w-full h-full p-4">
        <div className="flex justify-between items-center  p-2">
          <div className="text-2xl font-bold">교과목 수정</div>
          <button
            className="w-10 h-10"
            onClick={() => {
              deleteSubject()
            }}
          >
            <TrashIcon className=" p-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-200 text-white" />
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
              className="grid grid-cols-3 gap-2 text-center"
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
            <div className="grid grid-cols-2 gap-2 text-center">
              {subjects
                ? subjects.map((data, key) => (
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
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "COMMON" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("COMMON")}
              >
                공통선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "SERIES" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("SERIES")}
              >
                계열선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "COURSE" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("COURSE")}
              >
                과정선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "FREE" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("FREE")}
              >
                자유선택
              </button>
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
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${difficulty === "BASIC" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlDifficultySelect("BASIC")}
              >
                일반
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${difficulty === "HONOR" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlDifficultySelect("HONOR")}
              >
                고급
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${
                  difficulty === "BILINGUAL" ? "bg-slate-800 text-white" : ""
                }`}
                onClick={() => controlDifficultySelect("BILINGUAL")}
              >
                이중언어
              </button>
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
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "COMMON" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("COMMON")}
              >
                공통
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "GENERAL" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("GENERAL")}
              >
                일반
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "FOUNDATION" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("FOUNDATION")}
              >
                기초
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "PRO" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("PRO")}
              >
                전문
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "PRO1" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("PRO1")}
              >
                전문 1
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "PRO2" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("PRO2")}
              >
                전문 2
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "EXPLORATION" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("EXPLORATION")}
              >
                탐구
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "CLUTURE" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("CLUTURE")}
              >
                생활•교양
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "CARERR" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("CARERR")}
              >
                진로
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${area === "PEANDART" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlAreaeSelect("PEANDART")}
              >
                예술체육
              </button>
            </div>
            <ErrorMessage
              errors={errors}
              name="subjectArea"
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
            <div className="grid grid-cols-2 gap-2">
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
            <div className="grid grid-cols-2 gap-2">
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
