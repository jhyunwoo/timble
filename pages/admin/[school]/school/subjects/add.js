import ProtectedPage from "../../../../../components/ProtectedPage"
import { useForm } from "react-hook-form"
import useSchool from "../../../../../lib/client/useSchool"
import { useEffect, useState } from "react"
import { ErrorMessage } from "@hookform/error-message"
export default function AddSubject() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm()
  const { diplomas, subjects } = useSchool()
  const [diploma, setDiploma] = useState([])
  const [prerequisite, setPrerequisite] = useState([])
  const [type, setType] = useState("")
  const [area, setArea] = useState("")
  const [open, setOpen] = useState([])
  const [csat, setCsta] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
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

  return (
    <ProtectedPage>
      <div className="w-full h-full p-4">
        <div className="text-2xl font-bold mx-2 mb-2">교과목 추가</div>
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
                      onClick={() => controlDiplomaSelect(data.name)}
                      key={key}
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        diploma.includes(data.name) ? "bg-slate-800 text-white" : ""
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
                      onClick={() => controlPrerequisiteSelect(data.title)}
                      key={key}
                      className={`bg-slate-50 p-1 px-2 rounded-md ${
                        prerequisite.includes(data.title) ? "bg-slate-800 text-white" : ""
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
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "공통선택" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("공통선택")}
              >
                공통선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "계열선택" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("계열선택")}
              >
                계열선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "과정선택" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("과정선택")}
              >
                과정선택
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${type === "자유선택" ? "bg-slate-800 text-white" : ""}`}
                onClick={() => controlTypeSelect("자유선택")}
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
              {...register("subjectArea", { required: { value: true, message: "교과영역을 입력하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              교과 영역
            </div>
            <div className="grid grid-cols-2 gap-2">
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

            <div
              {...register("subjectCSAT", { required: { value: true, message: "수능 과목 여부를 선택하세요" } })}
              className="text-lg font-semibold mt-2"
            >
              수능 과목 여부
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${csat ? "bg-slate-800 text-white" : ""}`}
                onClick={() => setCsta(true)}
              >
                예
              </button>
              <button
                type="button"
                className={`bg-slate-50 p-1 px-2 rounded-md ${!csat ? "bg-slate-800 text-white" : ""}`}
                onClick={() => setCsta(false)}
              >
                아니요
              </button>
            </div>

            <div className="text-lg font-semibold mt-2">목표</div>
            <textarea
              className="w-full h-20 bg-slate-100 rounded-md outline-none focus:outline-blue-500 focus:outline-2 p-1 my-1"
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
            <button type="submit">제출</button>
          </form>
        </div>
      </div>
    </ProtectedPage>
  )
}
