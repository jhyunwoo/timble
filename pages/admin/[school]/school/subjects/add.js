import ProtectedPage from "../../../../../components/ProtectedPage"
import { useForm } from "react-hook-form"
import useSchool from "../../../../../lib/client/useSchool"
import { useEffect, useState } from "react"
import { ErrorMessage } from "@hookform/error-message"
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import axios from "axios"

export default function AddSubject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()
  const { diplomas, subjects, id } = useSchool()
  const [diploma, setDiploma] = useState([])
  const [prerequisite, setPrerequisite] = useState([])
  const [type, setType] = useState("")
  const [area, setArea] = useState("")
  const [open, setOpen] = useState([])
  const [csat, setCsta] = useState(0)
  const [contentLength, setContentLength] = useState(1)

  async function postSubject(data, content) {
    await axios.post("/api/adminPost", {
      post: "adminPostSubject",
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
    })
  }
  const onSubmit = (data) => {
    console.log(data)
    console.log(contentLength)
    let unifyContent = []
    for (let i = 1; i < contentLength; i++) {
      unifyContent.push({
        area: data[`contentArea${i}`],
        mainTarget: data[`contentMainTarget${i}`],
        detail: data[`contentDetail${i}`],
      })
    }
    console.log(unifyContent)
    postSubject(data, unifyContent)
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
